export default function Youtube({ src }: { src: string }) {
  return (
    <div className="relative h-0 pb-[56.25%] pt-6">
      <iframe
        className="absolute top-0 left-0 h-full w-full"
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
