import {
  Box,
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function RequestAccess() {
  const [softwares, setSoftwares] = useState([]);
  const [requestedSoftwareIds, setRequestedSoftwareIds] = useState([]); // track requested software ids locally
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [reason, setReason] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch all softwares on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchSoftwares = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/getSoftwares`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSoftwares(res.data);
      } catch (error) {
        toast({
          title: "Error loading softwares",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchSoftwares();
  }, []);

  const handleRequestClick = (software) => {
    setSelectedSoftware(software);
    setReason("");
    onOpen();
  };

  const handleSendRequest = async () => {
    if (!reason.trim()) {
      toast({ title: "Please provide a reason", status: "warning" });
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${BASE_URL}/api/requests`,
        {
          softwareId: selectedSoftware.id,
          accessType: selectedSoftware.accessLevels[0] || "Read",
          reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({ title: "Request sent successfully", status: "success" });

      // Mark this software as requested locally
      setRequestedSoftwareIds((prev) => [...prev, selectedSoftware.id]);

      onClose();
    } catch (error) {
      toast({
        title: "Failed to send request",
        description: error.response?.data?.message || error.message,
        status: "error",
      });
    }
  };

  return (
    <Box maxW="700px" mx="auto" p={6}>
      <Text fontSize="2xl" mb={6} textAlign="center">
        Request Access to Software
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {softwares.map((software) => {
          const isRequested = requestedSoftwareIds.includes(software.id);

          return (
            <Box
              key={software.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              h="100%"
            >
              <Box mb={3}>
                <Text fontWeight="bold">{software.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {software.description}
                </Text>
              </Box>

              <Button
                colorScheme={isRequested ? "yellow" : "blue"}
                onClick={() => handleRequestClick(software)}
                isDisabled={isRequested}
                mt="auto"
              >
                {isRequested ? "Pending" : "Request"}
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
      {/* Modal for entering reason */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Access for {selectedSoftware?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter reason for access"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSendRequest}>
              Send Request
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
