import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Badge,
  Image,
  SimpleGrid,
  Button,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
  Collapse,
  GridItem,
  Flex,
  ButtonGroup,
  IconButton,
  Checkbox,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  StarIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

import "../css/pagination.css";

const baseUrl = "https://6693578bc6be000fa07af327.mockapi.io/orchid";

export default function NaturalPage() {
  const navigate = useNavigate();
  const [orchids, setOrchids] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(true);
  const [isMaterialFilterOpen, setIsMaterialFilterOpen] = useState(true);
  const [isColorFilterOpen, setIsColorFilterOpen] = useState(true);

  const [layout, setLayout] = useState("grid");
  const [layoutChange, setLayoutChange] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    categories: [],
    origin: [],
    colors: [],
  });

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const res = await axios.get(baseUrl);
        setOrchids(res.data);
        console.log("Fetched orchids successfully");
      } catch (err) {
        console.error("Failed to fetch orchids:", err.message);
      }
    };
    fetchOrchid();
  }, []);

  const getUniqueCategories = () => {
    const uniqueCategories = new Set(orchids.map((orchid) => orchid.category));
    return Array.from(uniqueCategories);
  };

  const getUniqueOrigins = () => {
    const uniqueOrigins = new Set(orchids.map((orchid) => orchid.origin));
    return Array.from(uniqueOrigins);
  };

  const getUniqueColors = () => {
    const uniqueColors = new Set(orchids.map((orchid) => orchid.color));
    return Array.from(uniqueColors);
  };

  const filteredOrchids = useMemo(() => {
    return orchids.filter((product) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category)
      ) {
        return false;
      }
      if (
        filters.origin.length > 0 &&
        !filters.origin.includes(product.origin)
      ) {
        return false;
      }
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(product.color)
      ) {
        return false;
      }
      return (
        !searchTerm ||
        product.orchidName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [orchids, filters, searchTerm]);

  const totalResults = filteredOrchids.length;
  const totalPages = useMemo(
    () => Math.ceil(totalResults / itemsPerPage),
    [totalResults, itemsPerPage]
  );
  const displayedProducts = useMemo(
    () => filteredOrchids.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
    [filteredOrchids, page, itemsPerPage]
  );

  // Debounce the search input to reduce re-renders
  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 300), []);

  const handleSearchChange = (e) => {
    debouncedSetSearchTerm(e.target.value);
  };

  // Memoize handler functions to prevent re-renders
  const handleFilterChange = useCallback((type, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const index = newFilters[type].indexOf(value);
      if (index > -1) {
        newFilters[type].splice(index, 1);
      } else {
        newFilters[type].push(value);
      }
      return newFilters;
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = useCallback((event) => {
    setPage(event.selected);
    scrollToTop();
  }, []);

  useEffect(() => {
    if (layoutChange) {
      setOpacity(0);
      const timer = setTimeout(() => {
        setOpacity(1);
        setLayoutChange(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [layoutChange]);

  const handleLayoutChange = (newLayout) => {
    if (layout !== newLayout) {
      setLayoutChange(true);
      setTimeout(() => {
        setLayout(newLayout);
        setItemsPerPage(newLayout === "grid" ? 12 : 10);
      }, 500);
    }
  };

  return (
    <Container maxW="90vw" mt={10}>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
        <Box p={4}>
          <InputGroup mb={5}>
            <Input
              placeholder="Search Orchid..."
              onChange={handleSearchChange}
            />
            <InputRightElement>
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
          <VStack align="start">
            <Button
              width="100%"
              justifyContent="space-between"
              bg="none"
              fontSize="xl"
              rightIcon={
                isCategoryFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
            >
              Category
            </Button>
            <Collapse in={isCategoryFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {getUniqueCategories().map((category) => (
                  <Checkbox
                    key={category}
                    isChecked={filters.categories.includes(category)}
                    onChange={() => handleFilterChange("categories", category)}
                  >
                    {category}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
            <Button
              width="100%"
              justifyContent="space-between"
              bg="none"
              fontSize="xl"
              rightIcon={
                isMaterialFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              onClick={() => setIsMaterialFilterOpen(!isMaterialFilterOpen)}
            >
              Origin
            </Button>
            <Collapse in={isMaterialFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {getUniqueOrigins().map((origin) => (
                  <Checkbox
                    key={origin}
                    isChecked={filters.origin.includes(origin)}
                    onChange={() => handleFilterChange("origin", origin)}
                  >
                    {origin}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
            <Button
              width="100%"
              justifyContent="space-between"
              bg="none"
              fontSize="xl"
              rightIcon={
                isColorFilterOpen ? <ChevronDownIcon /> : <ChevronUpIcon />
              }
              onClick={() => setIsColorFilterOpen(!isColorFilterOpen)}
            >
              Color
            </Button>
            <Collapse in={isColorFilterOpen}>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                lineHeight={10}
                px={3}
              >
                {getUniqueColors().map((color) => (
                  <Checkbox
                    key={color}
                    isChecked={filters.colors.includes(color)}
                    onChange={() => handleFilterChange("colors", color)}
                  >
                    {color}
                  </Checkbox>
                ))}
              </Box>
            </Collapse>
          </VStack>
        </Box>
        <GridItem colSpan={3}>
          <Flex justifyContent="space-between" mb={5}>
            <ButtonGroup isAttached>
              <IconButton
                icon={<FontAwesomeIcon icon={faGrip} />}
                isActive={layout === "grid"}
                onClick={() => handleLayoutChange("grid")}
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faList} />}
                isActive={layout === "list"}
                onClick={() => handleLayoutChange("list")}
              />
            </ButtonGroup>
          </Flex>
          <div style={{ transition: "opacity 0.5s", opacity: opacity }}>
            {layout === "grid" ? (
              <SimpleGrid columns={3} spacing={5}>
                {displayedProducts.map((orchid) => (
                  <Box
                    key={orchid.id}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    borderColor="teal"
                  >
                    <Image
                      src={orchid.image}
                      alt={orchid.orchidName}
                      width="100%"
                      height="300px"
                    />
                    <Box p="5">
                      <Box
                        display="flex"
                        alignItems="baseline"
                        justifyContent="space-between"
                      >
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          fontSize="xs"
                          mr="4"
                        >
                          {orchid.category} &bull; {orchid.origin}
                        </Box>
                        {orchid.isNatural && (
                          <Badge borderRadius="full" px="2" colorScheme="teal">
                            Natural
                          </Badge>
                        )}
                      </Box>
                      <Box
                        mt="1"
                        fontWeight="bold"
                        as="h2"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        {orchid.orchidName}
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          {Array(5)
                            .fill("")
                            .map((_, i) => (
                              <StarIcon
                                fontSize={14}
                                ml={0.5}
                                key={i}
                                color={
                                  i < orchid.rating ? "teal.500" : "gray.300"
                                }
                              />
                            ))}
                        </Box>
                        <Button
                          onClick={() => navigate(`/detail/${orchid.id}`)}
                          variant="link"
                          color="teal.500"
                        >
                          View more
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <VStack spacing={4} align="stretch">
                {displayedProducts.map((orchid) => (
                  <Flex
                    key={orchid.id}
                    // p={3}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="teal"
                    align="center"
                  >
                    <Image
                      src={orchid.image}
                      alt={orchid.orchidName}
                      boxSize="90px"
                      w="20%"
                      h="220px"
                      mr={5}
                    />
                    <Box flex="1">
                      <Box fontSize="lg" fontWeight="semibold">
                        {orchid.orchidName}
                      </Box>
                      <Box fontSize="sm" color="gray.600">
                        {orchid.category} &bull; {orchid.origin}
                      </Box>
                    </Box>
                    <Button
                      onClick={() => navigate(`/detail/${orchid.id}`)}
                      variant="link"
                      color="teal.500"
                      mr={5}
                    >
                      View more
                    </Button>
                  </Flex>
                ))}
              </VStack>
            )}
          </div>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
}
