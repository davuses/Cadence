import { createFileRoute } from "@tanstack/react-router";
import { CadenceApp } from "@/components/cadence/cadence-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-screen bg-bg text-fg">
      <CadenceApp />
    </main>
  );
}
