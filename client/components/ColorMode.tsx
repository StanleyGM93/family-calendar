import { Button, Icon, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

function ColorToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>
      {colorMode === 'light' ? <Icon as={MoonIcon} /> : <Icon as={SunIcon} />}
    </Button>
  )
}

export default ColorToggleButton
