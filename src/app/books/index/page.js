import Card from "@/app/components/books/card/page";

export default function Index() {
  return (
    <>
      <header className="flex justify-center py-16">
        <div className="grid grid-cols-1">
          <h1 className="lg:text-6xl text-3xl text-center">
            Sfoglia i libri lavati
          </h1>
        </div>
      </header>

      <section className="flex justify-center">
        <div className="grid grid-cols-2">
          <Card></Card>
        </div>
      </section>
    </>
  );
}
