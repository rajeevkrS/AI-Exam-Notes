function Stats() {
  return (
    <section className="max-w-7xl mx-auto mb-6 rounded-2xl bg-linear-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl text-white border border-white/10 px-10 py-8 shadow-[0_25px_70px_rgba(0,0,0,0.35)]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        <div>
          <h3 className="text-4xl font-bold">10K+</h3>
          <p className="mt-2 text-gray-400">Notes Generated</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">5K+</h3>
          <p className="mt-2 text-gray-400">Active Students</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">98%</h3>
          <p className="mt-2 text-gray-400">Satisfaction Rate</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">50+</h3>
          <p className="mt-2 text-gray-400">Subjects Covered</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
