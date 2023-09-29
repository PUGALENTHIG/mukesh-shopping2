import { Box, Button, Card, CardBody, Heading, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Stack, StackDivider, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import {styled} from "styled-components";
import {ChevronDownIcon, SearchIcon} from "@chakra-ui/icons";
import NavCatCard from './NavCatCard';
import {useDispatch, useSelector} from "react-redux";
import { getSearch } from '../Redux/SearchReducer/action';
import { useDebounce } from '../CoustomHooks/useDebounce';
import NavSearchCard from './NavSearchCard';
import SignInAndSignUp from './SignInAndSignUp';


const categoryData = [
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FHeadphoneCat.png?alt=media&token=26a8b23d-1724-4fdb-ae33-28f7f8e5a189&_gl=1*yrtok1*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQ0NTYuNjAuMC4w",
  text: "Headphone"
  },
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FBagsCat.png?alt=media&token=ed0d203f-f84b-4904-9a6c-e91c53ce8df0&_gl=1*8pq0s7*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQ0ODcuMjkuMC4w",
  text: "Bags"
  },
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FBooksCat.png?alt=media&token=fbe37595-198a-47d5-8bd3-cdecea960783&_gl=1*sn37vj*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQzMjQuNjAuMC4w",
  text: "Books"
  },
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FFurnitureCat.png?alt=media&token=8b77e86b-f3d4-4012-84c7-bc2d34634ad5&_gl=1*10atbe*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQzNTkuMjUuMC4w",
  text: "Furniture"
  },
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FLaptopsCat.png?alt=media&token=b4c62785-646e-47cc-a97d-2cec96d49e7f&_gl=1*15dqaps*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQzOTQuNjAuMC4w",
  text: "Laptops"
  },
  {imageUrl:"https://firebasestorage.googleapis.com/v0/b/decisive-duck.appspot.com/o/Resources%2FCategory_cards%2FShoesCat.png?alt=media&token=6a5648f2-8e01-43c3-898f-72421a87935c&_gl=1*udskit*_ga*OTcyNzU4NTcxLjE2OTQxMjAyNjM.*_ga_CW55HF8NVT*MTY5NTkwNDEyNS4yMi4xLjE2OTU5MDQ0MjQuMzAuMC4w",
  text: "Shoes"
  }
]

function Navbar() {
  const [focus, setFocus] = useState(false);
  const [typed, setTyped] = useState(false);
  const dispatch = useDispatch();
  const newFunc = useDebounce(1000,dispatch);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {isLoading,isError, products} = useSelector((store)=> {
    return {
      isLoading: store.searchReducer.isLoading,
      isError: store.searchReducer.isError,
      products: store.searchReducer.products,
    }
  })

  const hanldeSearchFocus = ()=>{
    setFocus(true);
  }

  const handleSearch = (e)=>{
    if(e.target.value.length > 0){
      setTyped(true);
      newFunc(getSearch(e.target.value));
    }else{
      setTyped(false);
    }
  }

  return (
    <DIV>
      <DIV2>
        <div style={{width:"50px"}}><img style={{width: "100%"}} src='https://placehold.co/400x400'/></div>
        <div>ShopCart</div>
      </DIV2>

      <DIV3>
      <DIV2>
      <Menu>
      <MenuButton  as={Button} variant={"link"} rightIcon={<ChevronDownIcon />}>
        Category
      </MenuButton>
      <MenuList>
        <SimpleGrid columns={2} spacing={4}>
          {
            categoryData.map((el, index) => <NavCatCard key={index} {...el}/> )
          }
        </SimpleGrid>
      </MenuList>
    </Menu>
      </DIV2>

          {!focus && 
      <DIV2>
        <div>Deals</div>
        <div>What's New</div>
        <div>Sale</div>
      </DIV2>
          }

      <Box  position={"relative"} w={focus && "80%"}>
        <div>
          <InputGroup >
            <Input w={"100%"} onChange={handleSearch} onFocus={hanldeSearchFocus}/>
            <InputRightElement>
              <SearchIcon/>
            </InputRightElement>
          </InputGroup>
        </div>
        <SEARCHMENU focus={typed}>
          <Card>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                {products?.map(el => <NavSearchCard key={el.id} halfStar={Math.ceil(el.rating)-Math.floor(el.rating) == 1? 1:0} emptyStar={5 - Math.ceil(el.rating)} fullStar={Math.floor(el.rating)} {...el}/>)}
              </Stack>
            </CardBody>
          </Card>
        </SEARCHMENU>

      </Box>
        
      </DIV3>


      <DIV2>
        <Button onClick={onOpen} >Login/Signup</Button>
      </DIV2>
      <SignInAndSignUp isOpen={isOpen} onClose={onClose}/>
    </DIV>
  )
}

export default Navbar

const DIV = styled.div`
  padding: 10px 2% ;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DIV2 = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`
const DIV3 = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
`

const SEARCHMENU = styled.div`
  position: absolute;
  top: 100%;
  visibility: ${(props)=> (props.focus?"visible":"hidden")};
`
