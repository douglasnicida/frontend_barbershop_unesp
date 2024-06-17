import './style.css'
import { Button, ButtonGroup, Card, CardFooter, Heading, IconButton, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Stack, Tag, Text, useDisclosure } from '@chakra-ui/react';
import AppointmentDrawer from '../appointment_create_drawer/AppointmentDrawer';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../utils/axiosConfig';
import { useState } from 'react';
import { toast } from 'react-toastify';

function DeleteConfimation({onClick}) {
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <>
      <IconButton colorScheme='red' onClick={onToggle} aria-label='Close icon' top={2} right={2} position={'absolute'} icon={<IoClose />} />
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Confirmação</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Tem certeza que deseja deletar este serviço?
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button variant='outline'>Cancelar</Button>
              <Button colorScheme='red' onClick={onClick}>Deletar</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default function ServiceCard({service, hasDeleteButton}) {
    const [id, setId] = useState(service?.id);

    async function handleDeleteService() {

      try {
        await axiosInstance.delete(`/servico/${id}`)
        toast.success('Serviço foi excluído com sucesso')
        setTimeout(() => {window.location.reload()}, 2000)
      } catch(e) {
        toast.error('Falha ao tentar excluir serviço');
      }
    }

    const imgFallback = "https://lh3.googleusercontent.com/proxy/0xBM0IzhQ1y6K59xf8W-Ft3j6KDgOuirePxWTxMX7tNWCa1OHq-8S--WNmMTN_sfNObgxa9f70V0NO7OegMkjyIaJy-phN_7SOob6QgCPaZyEEtJMKcIyK0z0yonZZm534AyKd6d0o9rFDXSDq4_yrmmsw"

    return (
        <Card className='service-card' maxW={'sm'} position={'relative'}>
            <Image
              src={(service?.imagem) ? service?.imagem : imgFallback}
              className='service-card-image'
            />
            <Stack mt="6" spacing="3" paddingX={5}>
                
              <Heading size="sm" className='card-service-label'>Serviço</Heading>
              <Heading size="md" height={"48px"}>{service?.nome}</Heading>
              <Text className='card-service-details'>{service?.descricao}</Text>

              <Tag className='service-card-price'>R${service?.preco},00</Tag>

              {
                (hasDeleteButton) && 
                <DeleteConfimation onClick={handleDeleteService}/>
              }
            </Stack>
    
          <CardFooter>
            <div className="card-footer-container">
              <AppointmentDrawer service={service}/>
            </div>
          </CardFooter>
        </Card>
      );
}