import { useState, useEffect, useLayoutEffect } from "react"
import axios from "axios";
import { CardCat } from '../../components/Card';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { data } from '../../components/data';
import CircularProgress from '@mui/material/CircularProgress';


export function Main() {

    let [cards, setCards] = useState();
    let [free, setFree] = useState(false);
    let [modal, setModal] = useState(false);

    useLayoutEffect(() => {
        const URL = 'https://internship.apps.robotbull.com/cats';
        var controller = new AbortController();
        var signal = controller.signal;
        axios.get(URL, { signal }).then((resp) => {
            setCards(resp.data.items)
        }).catch(err => {
            // what now? 
            console.log(err);
        })
        return () => {
            controller.abort();
            console.log('abort')
        }
    }, [])  
    // показать одного кота
    const openModal = (i) => { setModal(cards[i]) }
    // закрыть модально окно
    const closeModal = (e) => {
        setModal(false)
    }
    // показать только свободных
    const freeCats = () => {
        setFree(!free)
    }
    //забронировать котика
    const bookCat = (index, id) => {
        fetch(`https://internship.apps.robotbull.com/cats/book_cat/${id}`, {
            method: "PUT",
            body: JSON.stringify(),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); window.location.reload()
            })
        console.log(index, id)
    }
    // снять бронь с котика 
    const unBookCat = (index, id) => {
        fetch(`https://internship.apps.robotbull.com/cats/unbook_cat/${id}`, {
            method: "PUT",
            body: JSON.stringify(),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); window.location.reload()
            })
        console.log(index, id)
    }
     // получить актуальные данные
     const getData = () => {
        const URL = 'https://internship.apps.robotbull.com/cats';
        axios.get(URL).then((resp) => {
            setCards(resp.data.items)
        }).catch(err => {
            console.log(err);
        })
    }
    
   

    return (<>
        {cards ?
            <Container fixed component='main'>
                <Box m={2} pt={3} >
                    <Typography component='span' variant="h5" > FREE Cats : </Typography>
                    <Switch onChange={freeCats} />
                </Box>
                <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} m={2} pt={3}>
                    {free ?
                        cards.filter((i) => { return !i.isBooked }).map((i, index) => {
                            return (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <CardCat {...i} openModal={openModal} index={index} closeModal={closeModal} bookCat={bookCat} unBookCat={unBookCat} />
                                </Grid>
                            )
                        })
                        :
                        cards.map((i, index) => {
                            return (
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <CardCat {...i} openModal={openModal} index={index} closeModal={closeModal} bookCat={bookCat} unBookCat={unBookCat} />
                                </Grid>
                            )
                        })

                    }
                </Grid>
            </Container> :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        }
    </>)
}