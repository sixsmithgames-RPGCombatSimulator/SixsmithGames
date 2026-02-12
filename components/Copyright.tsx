export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-sm text-gray-600">
      <p>© {currentYear} Sixsmith Games. All rights reserved.</p>
    </div>
  );
}
