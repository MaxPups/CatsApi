import { useState, } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit'; import Modal from '@mui/material/Modal'; import Box from '@mui/material/Box';
import { FormCat } from '../components/form';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'rgb(203, 203, 203)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

export function CardCat({ nameCat, index, id, breed, color, age, price,
    unBookCat, image, isBooked, bookCat }) {

    const [open, setOpen] = useState(false);
    const toggleForm = () => setOpen(!open);
    const [modalRemove, setModalRemove] = useState(false);
    const toggleModla = () => setModalRemove(!modalRemove);
    const [openModalCard, setOpenModal] = useState(false);
    const toggleOpenModal = () => setOpenModal(!openModalCard);
    
    // удалить кота
    const deleteCat = () => {
        fetch(`https://internship.apps.robotbull.com/cats/delete_cat/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => { console.log(res, 'very good! remove 59'); window.location.reload() });
        toggleModla();
    }

    return <>

        <Card sx={{ maxWidth: 300 }}
        >
            <CardMedia
                component="img"
                height="140"
                image={image ? image : 'http://ic.pics.livejournal.com/option_systems/31828956/168952/168952_original.jpg'}
                alt={nameCat}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="h5">
                    {nameCat}
                </Typography>
            </CardContent>
            <CardActions>

                {isBooked ? <Button size="small" variant="outlined" onClick={() => { unBookCat(index, id) }}>booked</Button>
                    : <Button size="small" variant='contained' onClick={() => { bookCat(index, id) }}>book</Button>
                }
                <Button size="small" variant="outlined" onClick={toggleOpenModal}>More</Button>
                <Tooltip title="Edit cats" >
                    <IconButton onClick={toggleForm}>
                        <EditIcon color="disabled" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete cat">
                    <IconButton onClick={toggleModla}>
                        <RestoreFromTrashIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
        {/* форма для редактирования  */}
        <Modal
            open={open}
            onClose={toggleForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <FormCat title='Edit cat' breed={breed} color={breed} ageCat={age} price={price} nameCat={nameCat} id={id} toggleForm={toggleForm} />
            </Box>
        </Modal>
        {/* форма для удаления  */}
        <Modal
            open={modalRemove}
            onClose={toggleModla}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" >
            <Box sx={style}>
                <Typography variant="h3" component="h3"> Remove this Cat?</Typography>
                <Box display='flex' alignItems='center' justifyContent="center" >
                    <Tooltip title="Delete cat">
                        <IconButton onClick={deleteCat}>
                            <RestoreFromTrashIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

            </Box>
        </Modal>
        {/* модальное окно */}
        <Modal
            open={openModalCard}
            onClose={toggleOpenModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CardMedia
                    component="img"
                    height="540"
                    image={image ? image : 'http://ic.pics.livejournal.com/option_systems/31828956/168952/168952_original.jpg'}
                    alt={nameCat}
                />
                <Typography variant="h4" component="div" pt={3}>
                    <Typography>Цвет: {color}</Typography>
                    <Typography>  Возраст: {age}</Typography>
                    <Typography> Стоимость: {price}</Typography>
                </Typography>
                <Tooltip title="Delete cat">
                    <IconButton onClick={toggleModla}>
                        <RestoreFromTrashIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit cats" >
                    <IconButton onClick={toggleForm}>
                        <EditIcon color="disabled" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Modal>

    </>
}