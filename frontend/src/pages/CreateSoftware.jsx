// src/pages/CreateSoftware.jsx
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CreateSoftware() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    accessLevels: [],
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccessChange = (values) => {
    setFormData((prev) => ({ ...prev, accessLevels: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${BASE_URL}/api/software`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Software created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Optional: Clear form
      setFormData({
        name: "",
        description: "",
        accessLevels: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create software",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        width="100%"
        maxW="400px"
      >
        <Text fontSize="2xl" mb={6} textAlign="center">
          Create Software
        </Text>

        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Software name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Software description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Access Levels</FormLabel>
          <CheckboxGroup
            colorScheme="blue"
            value={formData.accessLevels}
            onChange={handleAccessChange}
          >
            <Stack spacing={2} direction="column">
              <Checkbox value="Read">Read</Checkbox>
              <Checkbox value="Write">Write</Checkbox>
              <Checkbox value="Admin">Admin</Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Button colorScheme="blue" width="100%" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
