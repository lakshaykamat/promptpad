import Link from "next/link";

function RootPage() {
  return <>
  <h1>Root Page</h1>
  <Link href={'/dashboard'}>/dashboard</Link>
  </>;
}
export default RootPage;
