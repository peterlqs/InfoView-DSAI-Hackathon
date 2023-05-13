import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <p className="text-left text-4xl m-4 ml-10 font-bold font-mono">
            <span className="text-[#003049]">Info</span>
            <span className="text-[#669bbc]">View</span>
          </p>
        </div>
        <Main />
        <NextScript />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
        ></script>
      </body>
    </Html>
  );
}
