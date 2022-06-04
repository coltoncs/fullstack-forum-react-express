import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title, titleSize }: { title: string, titleSize?: number }) => (
  <Flex
    flexDirection={`row`}
    justifyContent="center"
    alignItems="center"
    height="20vh"
    maxW="100%"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
    mt={5}
  >
    <Heading fontSize={`${titleSize}vw`}>{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'The Community Forum',
  titleSize: 6,
}
