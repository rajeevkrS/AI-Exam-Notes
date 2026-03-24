function Stats() {
  return (
    <section className="max-w-11/12 mx-auto mt-16 md:mt-20 mb-10 rounded-2xl bg-white/20 border border-white/20 backdrop-blur-lg text-white px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
      {/*  */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <div>
          <h3 className="text-4xl font-bold">10K+</h3>
          <p className="mt-2 text-gray-100">Notes Generated</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">5K+</h3>
          <p className="mt-2 text-gray-100">Active Students</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">98%</h3>
          <p className="mt-2 text-gray-100">Satisfaction Rate</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">50+</h3>
          <p className="mt-2 text-gray-100">Subjects Covered</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
