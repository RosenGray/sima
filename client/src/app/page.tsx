import { Button, Flex, Heading, Text, Box } from "@radix-ui/themes";
import Header from "../components/Header/Header/Header";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import HomePageProvider from "@/providers/HomePageProvider/HomePageProvider";
import Dummy from "@/components/Dummy/Dummy";

// const PageContainer = styled(Container)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   padding-top: 6rem; /* Add padding to account for fixed header */
// `;

// const MainContent = styled(Section)`
//   text-align: center;
//   max-width: 600px;
// `;

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const testSendEmail = async () => {
  "use server";
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILER_SEND_API_KEY || "",
  });

  const sentFrom = new Sender(
    "noreply@sima-board.com",
    "Sima Board"
  );

  const recipients = [new Recipient("vladonchik@gmail.com", "Vlad Onchik")];
  //const recipients = [new Recipient("test@sima-board.com", "Test User")];


  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("This is a Subject")
    .setHtml("<h1 style='color: red;'>Hello World</h1>")
    .setText(
      "Greetings from the team, you got this message through MailerSend."
    );

  try {
    const result = await mailerSend.email.send(emailParams);
    console.log('Email sent successfully', result);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export default async function Home() {
  const serviceCategories = await serviceCategoryRepository.getAll();

  return (
    <HomePageProvider data={{ serviceCategories }}>
      <Header />
      <Box pt="6rem">
        <Box>
          <Flex direction="column" gap="6" align="center">
            <Heading size="9" weight="bold">
              Hello World4
            </Heading>

            <Text size="6" color="gray">
              Welcome to our Marketplace
            </Text>

            <Text
              size="4"
              color="gray"
              style={{ maxWidth: "500px", lineHeight: "1.6" }}
            >
              Discover amazing products, connect with sellers, and build your
              business in our vibrant marketplace community. Your journey starts
              here.
            </Text>

            <Flex gap="4" mt="4">
              <Button size="3" variant="solid">
                Get Started
              </Button>
              <Button size="3" variant="outline">
                Learn More
              </Button>
            </Flex>
          </Flex>
          <div style={{ marginTop: 40, width: "100%" }}>
            <Dummy /> 7
            <form action={testSendEmail}>
              <button type="submit">Test Send Email</button>
            </form>
          </div>
        </Box>
      </Box>
    </HomePageProvider>
  );
}
