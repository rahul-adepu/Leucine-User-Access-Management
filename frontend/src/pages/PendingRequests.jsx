// src/pages/PendingRequests.jsx
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  useToast,
  Badge,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const role = localStorage.getItem("role"); // Assuming you store role in localStorage
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/requests/getAllRequests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pendingOnly = res.data.filter((req) => req.status === "Pending");
      setRequests(pendingOnly);
    } catch (error) {
      toast({
        title: "Error fetching requests",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/requests/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Remove updated request from UI
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">
        Pending Requests
      </Heading>

      {loading ? (
        <Spinner size="xl" thickness="4px" color="blue.500" />
      ) : requests.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No pending requests.
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {requests.map((req) => (
            <Box
              key={req.id}
              p={5}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              bg="white"
            >
              <Text fontWeight="bold" fontSize="lg">
                Software: {req.software.name}
              </Text>
              <Text>Description: {req.software.description}</Text>
              <Text>
                <strong>Access Levels:</strong>{" "}
                {req.software.accessLevels.join(", ")}
              </Text>
              <Text>
                <strong>Requested By:</strong> {req.user.username} (
                {req.user.role})
              </Text>
              <Text>
                <strong>Reason:</strong> {req.reason}
              </Text>
              <Text>
                <strong>Status:</strong>{" "}
                <Badge colorScheme="yellow" fontSize="0.9em">
                  {req.status}
                </Badge>
              </Text>

              {/* Show Approve/Reject buttons only if Manager */}
              {role === "Manager" && (
                <HStack mt={4}>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleUpdateStatus(req.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleUpdateStatus(req.id, "Rejected")}
                  >
                    Reject
                  </Button>
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
