const cards = [1, 2, 3, 4, 5, 6];

export default function Home() {
  return (
    /*
      Main page wrapper.
      🎯 GOAL #1: Change ONE WORD in this Tailwind class.
      Example: bg-slate-100 → bg-slate-200

      📝 What happened after your change?
      (The background color is now slate-900)
    */
    <main className="min-h-screen bg-slate-900 p-4">
      {/* Header section */}
      <header className="mb-4">
        {/* Page title */}
        {/*
          🎯 GOAL #2: Change ONE WORD here.
          Example: text-2xl → text-3xl

          📝 What happened after your change?
          (Write here)
        */}
        <h1 className="text-5xl font-bold">Tech Product Hub</h1>

        {/* Subtitle text */}
        <p className="text-sm text-slate-600">{/* Canvas-style dashboard */}</p>
      </header>

      {/* Container for the grid */}
      <section className="rounded-xl bg-white p-4">
        {/* Section heading */}
        <h2 className="mb-3 text-lg font-semibold">Nonprofit Canvas</h2>

        {/* Grid layout.
          🎯 GOAL #3: Change ONE WORD.
          Example: gap-4 → gap-2

          📝 What happened after your change?
          (Write here)*/}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((num) => (
            <div
              key={num}
              className="flex h-32 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500"
            >
              {/* Empty card #{num} */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
