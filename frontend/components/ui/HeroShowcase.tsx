<section className="relative h-screen flex items-center justify-center bg-neutral-950">
  <div className="relative w-[420px] h-[320px]">

    {/* 🖐 РУКА */}
    <img
      src="/hand.png"
      alt=""
      draggable={false}
      className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-[340px]
        z-10
        select-none
      "
    />

    {/* 🎩 ШЛЯПА */}
    <img
      src="/hat.png"
      alt=""
      draggable={false}
      className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-[380px]
        z-20
        select-none
      "
    />
  </div>
</section>