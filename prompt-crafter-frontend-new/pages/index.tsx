import { Link } from "@nextui-org/link";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";

import { title, subtitle } from "@/components/ui/primitives";
import DefaultLayout from "../layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Prompt&nbsp;</span>
          <span className={title({ color: "violet" })}>Crafter&nbsp;</span>
          <br />
          <span className={title()}>
            Precision-crafted prompts for any AI workflow
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Select your user persona to get started
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mt-8">
          <Card isPressable isHoverable className="hover:scale-105 transition-transform">
            <CardBody className="p-0">
              <div className="flex flex-col items-center p-6">
                <span className="text-4xl mb-2">🤖</span>
                <h3 className="text-xl font-bold">AI Agent Developer</h3>
                <p className="text-sm text-default-500 mt-2">Build complex AI workflows with n8n integration</p>
              </div>
            </CardBody>
            <CardFooter className="justify-center">
              <Badge variant="flat" color="primary" className="mr-2">n8n</Badge>
              <Badge variant="flat" color="secondary">API Integration</Badge>
            </CardFooter>
          </Card>

          <Card isPressable isHoverable className="hover:scale-105 transition-transform">
            <CardBody className="p-0">
              <div className="flex flex-col items-center p-6">
                <span className="text-4xl mb-2">🖋️</span>
                <h3 className="text-xl font-bold">Content Creator</h3>
                <p className="text-sm text-default-500 mt-2">SEO-optimized prompts for content generation</p>
              </div>
            </CardBody>
            <CardFooter className="justify-center">
              <Badge variant="flat" color="success" className="mr-2">SEO</Badge>
              <Badge variant="flat" color="warning">Blogging</Badge>
            </CardFooter>
          </Card>

          <Card isPressable isHoverable className="hover:scale-105 transition-transform">
            <CardBody className="p-0">
              <div className="flex flex-col items-center p-6">
                <span className="text-4xl mb-2">💬</span>
                <h3 className="text-xl font-bold">Casual User</h3>
                <p className="text-sm text-default-500 mt-2">Daily AI interaction templates</p>
              </div>
            </CardBody>
            <CardFooter className="justify-center">
              <Badge variant="flat" color="default" className="mr-2">Chat</Badge>
              <Badge variant="flat" color="primary">Templates</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
