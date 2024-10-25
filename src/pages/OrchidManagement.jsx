import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Spinner,
  Flex,
  Box,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const baseUrl = "https://6693578bc6be000fa07af327.mockapi.io/orchid";
const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dcs6oxnew/image/upload";

const OrchidTable = () => {
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  // Fetch orchids data
  const { data: orchids, isLoading } = useQuery("orchids", () =>
    axios.get(baseUrl).then((res) => res.data)
  );

  // Add new orchid
  const addOrchidMutation = useMutation(
    (newOrchid) => axios.post(baseUrl, newOrchid),
    {
      onSuccess: () => queryClient.invalidateQueries("orchids"),
    }
  );

  // Update orchid
  const updateOrchidMutation = useMutation(
    (updatedOrchid) =>
      axios.put(`${baseUrl}/${updatedOrchid.id}`, updatedOrchid),
    {
      onSuccess: () => queryClient.invalidateQueries("orchids"),
    }
  );

  // Delete orchid
  const deleteOrchidMutation = useMutation(
    (id) => axios.delete(`${baseUrl}/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("orchids"),
    }
  );

  const handleEdit = (orchid) => {
    setSelectedOrchid(orchid);
    setIsEditing(true);
    onOpen();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this orchid?")) {
      deleteOrchidMutation.mutate(id);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "xaemuxtra");

      try {
        const res = await axios.post(cloudinaryUploadUrl, formData);
        return res.data.secure_url;
      } catch (err) {
        console.error("Error uploading image:", err);
        return null;
      }
    }
    return null;
  };

  const handleSave = async () => {
    const form = {
      name: document.getElementById("orchid-name").value,
      origin: document.getElementById("orchid-origin").value,
      category: document.getElementById("orchid-category").value,
      isNatural: document.getElementById("orchid-isNatural").checked,
      image: await handleImageUpload(),
    };

    if (isEditing) {
      updateOrchidMutation.mutate({ ...selectedOrchid, ...form });
    } else {
      addOrchidMutation.mutate(form);
    }

    onClose();
    setSelectedOrchid(null);
    setIsEditing(false);
    setImageFile(null);
  };

  if (isLoading) return <Spinner my={300} size={30} />;

  return (
    <div>
      <Flex justify="flex-end" mb={4} mr={20}>
        <Button onClick={onOpen} colorScheme="blue">
          Add New Orchid
        </Button>
      </Flex>

      <Flex justify="center">
        <Box w="80%" mb={100}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                {/* <Th>Description</Th> */}
                <Th>Category</Th>
                <Th>Origin</Th>
                <Th>Natural</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orchids.map((orchid) => (
                <Tr key={orchid.id}>
                  <Td>
                    {orchid.image ? (
                      <img
                        src={orchid.image}
                        alt={orchid.name}
                        width="50"
                        height="50"
                      />
                    ) : (
                      "No image"
                    )}
                  </Td>
                  <Td>{orchid.name}</Td>
                  {/* <Td>{orchid.description}</Td> */}
                  <Td>{orchid.category}</Td>
                  <Td>{orchid.origin}</Td>
                  <Td>
                    {orchid.isNatural ? (
                      <Badge colorScheme="green">Natural</Badge>
                    ) : (
                      <Badge colorScheme="red">Not Natural</Badge>
                    )}
                  </Td>

                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      onClick={() => handleEdit(orchid)}
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(orchid.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>

      {/* Modal for Add/Edit Orchid */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Edit Orchid" : "Add New Orchid"}
          </ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                id="orchid-name"
                defaultValue={selectedOrchid?.name || ""}
              />
            </FormControl>
            {/* <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input
                id="orchid-description"
                defaultValue={selectedOrchid?.description || ""}
              />
            </FormControl> */}
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Input
                id="orchid-category"
                defaultValue={selectedOrchid?.category || ""}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Origin</FormLabel>
              <Input
                id="orchid-origin"
                defaultValue={selectedOrchid?.origin || ""}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" my={8}>
              <FormLabel htmlFor="orchid-isNatural" mb="0">
                Is Natural?
              </FormLabel>
              <Switch
                id="orchid-isNatural"
                defaultChecked={selectedOrchid?.isNatural || false}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OrchidTable;
