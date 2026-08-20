const React = require("react")
const url = require("url")
const {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Heading,
  Section,
  Tailwind,
  Text,
} =  require('react-email');
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const VerificationEmail = ({name="Okonudu Manasseh" }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body style={{fontFamily}} className="bg-white font-koala">
        <Preview>
          Verify  your <strong>XERO-TODO</strong> email address.
        </Preview>
        <Container className="mx-auto  py-5 px-3">
          <Img
            src="cid:xero-todo-image"
            width="200"
            height="200"
            alt="xero-todo"
            className="mx-auto"
          />
            <Heading className="capitalize text-center text-2xl font-bold">Confirm email address</Heading>
          <Text className="text-[16px] leading-[26px]">
            Hey {name},
          </Text>
          <Text className="text-[16px] leading-[26px]">
            You requsted to verify your email for <strong>XERO-TODO</strong>. <br /> 
            Click below to confim it's you
          </Text>
          <Section>
            <Button
              className="bg-[#F34D3A] rounded-md text-white text-[16px] no-underline py-2 px-3"
              href="https://example.com"
            >
              Confirm Address
            </Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

module.exports =  VerificationEmail;