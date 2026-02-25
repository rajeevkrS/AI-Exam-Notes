function UseCase() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-32">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold">Who Is PrepMate AI For?</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="p-8 border rounded-2xl">
          <h3 className="text-xl font-semibold">🎓 College Students</h3>
          <p className="mt-3 text-gray-600">
            Generate assignments, documentation and exam notes instantly.
          </p>
        </div>

        <div className="p-8 border rounded-2xl">
          <h3 className="text-xl font-semibold">📚 Competitive Exams</h3>
          <p className="mt-3 text-gray-600">
            Create high-yield revision material for quick recall.
          </p>
        </div>

        <div className="p-8 border rounded-2xl">
          <h3 className="text-xl font-semibold">💼 Project Builders</h3>
          <p className="mt-3 text-gray-600">
            Auto-generate structured project documentation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default UseCase;
