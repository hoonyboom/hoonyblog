export default function Youtube({ src }: { src: string }) {
  return (
    <div className="relative pb-[56.25%] pt-6 h-0">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        width="560"
        height="315"
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

