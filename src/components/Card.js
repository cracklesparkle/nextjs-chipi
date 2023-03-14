export default function Card({children,noPadding}) {
  let classes = 'shadow-gray-300 rounded-lg mb-5';
  if (!noPadding) {
    classes += ' p-4';
  }
  return (
    <div className={classes}>
      {children}
    </div>
  );
}