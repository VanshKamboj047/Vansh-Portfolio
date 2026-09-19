export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-6 mt-16">
      <div className="max-w-5xl mx-auto text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}