import { Workspace } from "@/components/Workspace";
import { DEFAULT_MODEL } from "@/lib/config";

export default function Home() {
  return <Workspace defaultModel={DEFAULT_MODEL} />;
}
