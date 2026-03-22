import Stripe from "stripe";
import UserModel from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  100: 50,
  200: 150,
  500: 300,
};

// API for creating Strip Session
export const createCreditsOrder = async (req, res) => {
  try {
    // Get user & plan
    const userId = req.userId;
    const { amount } = req.body;

    // Validate plan
    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({
        message: "Invalid credit plan",
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: CREDIT_MAP[amount],
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: `Strip error: ${error}` });
  }
};

// Stripe Webhook
// export const stripeWebhook = async (req, res) => {
//   const signature = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (error) {
//     return res.status(500).json({ message: `Strip Webhook: ${error}` });
//   }

//   // if checkout is successful
//   if (event.type == "checkout.session.completed") {
//     const session = event.data.object;

//     const userId = session.metadata.userId;

//     const creditsToAdd = Number(session.metadata.credits);

//     if (!userId || !creditsToAdd) {
//       return res.status(400).json({ message: "Invalid metadata!" });
//     }

//     // Update user
//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         // increasing credits
//         $inc: { credits: creditsToAdd },
//         // marks as true
//         $set: { isCreditAvailable: true },
//       },
//       { new: true },
//     );
//   }

//   res.json({ received: true });
// };

export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);

    const user = await UserModel.findById(userId);

    // Prevent duplicate credits
    if (user.lastPaymentSession === session_id) {
      return res.json({ success: true });
    }

    // Update user
    await UserModel.findByIdAndUpdate(userId, {
      $inc: { credits },
      $set: {
        isCreditAvailable: true,
        lastPaymentSession: session_id,
      },
    });

    return res.json({
      success: true,
      creditsAdded: credits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};
