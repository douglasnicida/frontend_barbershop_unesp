import { IconButton, Input, InputGroup, InputRightAddon, Select, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';
import './App.css';
import BarbershopCard from './components/barbershopCard/Card';
import { IoMdSearch } from 'react-icons/io';
import HeadingContainer from './components/heading/Heading';
import ContentContainer from './components/contentContainer/ContentContainer';
import { useEffect, useState } from 'react';
import axiosInstance from './utils/axiosConfig';
import { toast } from 'react-toastify';

export default function App() {
  const [barbershopsList, setBarbershopsList] = useState(null);
  const [barbershopsListOriginal, setBarbershopsListOriginal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const breadcrumbItems = [
    {
      page: 'Home',
      url: '/',
      isCurrent: true
    }
  ]

  useEffect(() => {
    async function getBarbershops() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/barbearia/`);
        // Verifica se a resposta contém os dados esperados
        if (response.data) {
          setBarbershopsList(response.data);
          setBarbershopsListOriginal(response.data);

          setIsLoading(false);
        } else {
          toast.error('Erro inesperado ao obter lista de barbearias.');
        }
      } catch(error) {
        console.error('Erro ao tentar obter barbearias:', error);
        toast.error('Erro inesperado ao tentar obter barbearias.');
      }
    }

    getBarbershops();
  }, []);

  function handleBarbershopFilter() {
    const filter = document.getElementById('searchBarbershopsHome').value;

    if(filter === ''){
      setBarbershopsList(barbershopsListOriginal)
    } else {
      const filteredBarbershopList = barbershopsListOriginal.filter(barbershop => barbershop.nomeBarbearia.includes(filter));

      setBarbershopsList(filteredBarbershopList);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBarbershopFilter()
    }
  }


// TODO: fazer funcionamento de filtro por serviço
// TODO: adicionar imagens a barbearia e serviço

  return (
    <>
      <HeadingContainer breadcrumbItems={breadcrumbItems} title={'Barbearias'}>
        <InputGroup>
          <Input id='searchBarbershopsHome' placeholder='Buscar' className='heading-search-input' onKeyDown={handleKeyDown}/>
          <InputRightAddon className='heading-search-input-right-buttons'>
            
            <Select variant='filled' placeholder='Serviço'>
              <option value='option1'>Corte masculino</option>
              <option value='option1'>Corte feminino</option>
              <option value='option1'>Barba</option>
              <option value='option1'>Tingir cabelo</option>
            </Select>
            <IconButton
              aria-label='Buscar barbearias'
              icon={<IoMdSearch size={23} />}
              className='heading-search-icon'
              onClick={handleBarbershopFilter}
            />
          </InputRightAddon>
        </InputGroup>
      </HeadingContainer>

      <ContentContainer>
        {
          (isLoading) &&
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        }
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))'>
            
        {
              (barbershopsList?.length > 0 && !isLoading) ?
              barbershopsList?.map((barbershopItem) => {
                return (
                  barbershopItem &&
                  <BarbershopCard key={barbershopItem.endereco} barbershop={barbershopItem}/>
                )
              })
              :
              (!isLoading) &&
              <h1>Nenhuma barbearia cadastrada.</h1>
            }
          </SimpleGrid>
      </ContentContainer>
    </>
  );
}