import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../api";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react";

export default function SignupPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: show, onToggle } = useDisclosure();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await signupAPI(formData);

    if (success) {
      toast({
        title: "Signup successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } else {
      toast({
        title: message || "Signup failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="100%"
        maxW="400px"
        p="6"
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading mb="6" size="lg" textAlign="center">
          Signup
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={onToggle}
                    size="sm"
                    _hover={{ bg: "transparent" }}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="green" width="100%">
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
