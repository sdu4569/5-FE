export default function ClubGallery() {
  return (
    <ul className="grid grid-cols-2 gap-2 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <li className="bg-pink-500 aspect-video"></li>
      ))}
    </ul>
  );
}
