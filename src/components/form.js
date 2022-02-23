import React from "react";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import style from './form.module.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Input } from "@mui/material";
import { styled } from '@mui/material/styles';




// import './form.css';



export function FormCat({ title, id, nameCat, ageCat, price, toggleFormCreate, toggleForm }) {
    // ageCat - nотому-что конфликтует с manerial

    // для material ui
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // для формы
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // функция создает
    const onSubmitPost = data => {
        console.log({
            "id": null,
            "nameCat": data.nameCat,
            "color": data.color,
            "price": data.price,
            "age": data.age,
            "isBooked": false,
            "createdAt": "2022-02-14T00:00:00.000Z",
            "breed": {
                "breedID": 2,
                "nameBreed": data.nameBreed,
                "createdAt": "2022-01-17T19:21:06.618Z"
            },
            "image": null
        });
        console.log('POST')
        fetch('https://internship.apps.robotbull.com/cats/create_cat', {
            method: "POST",
            body: JSON.stringify({
                "id": null,
                "nameCat": data.nameCat,
                "color": data.color,
                "price": data.price,
                "age": data.age,
                "isBooked": false,
                "createdAt": "2022-02-14T00:00:00.000Z",
                "breed": {
                    "breedID": 2,
                    "nameBreed": data.nameBreed,
                    "createdAt": "2022-01-17T19:21:06.618Z"
                },
                "image":null
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); window.location.reload()
            });
        { title ? toggleForm() : toggleFormCreate(); }
    };
    // функция обновляет 
    const onSumbitPut = data => {
        fetch(`https://internship.apps.robotbull.com/cats/update_cat/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "id": id,
                "nameCat": data.nameCat,
                "color": data.color,
                "price": data.price,
                "age": data.age,
                "isBooked": false,
                "createdAt": "2022-02-14T00:00:00.000Z",
                "breed": {
                    "breedID": 2,
                    "nameBreed": data.nameBreed,
                    "createdAt": "2022-01-17T19:21:06.618Z"
                },
                "image": null
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); window.location.reload()
            });
        { title ? toggleForm() : toggleFormCreate(); }
        ;

    }
    const Input = styled('input')({
        display: 'none',
    });
    return (
        <form onSubmit={title ? handleSubmit(onSumbitPut) : handleSubmit(onSubmitPost)} className={style.form} >
            <Typography variant="h3" gutterBottom component="div">
                {title ? title : 'Create cat'}
            </Typography>
            {/* фотография */}
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <TextField sx={{ m: 1, width: 420 }} id="outlined-basic" defaultValue={nameCat} label="Name" variant="outlined"{...register("nameCat", { required: true, })} />
            {errors.nameCat && "Имя должно быть получено"}
            <Box sx={{ m: 1, width: 420 }} m={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Color"
                        onChange={handleChange}
                        {...register("color", { required: true })}
                    >
                        <MenuItem value="black">black</MenuItem>
                        <MenuItem value="white">white</MenuItem>
                        <MenuItem value="brown">brown</MenuItem>
                        <MenuItem value="grey">grey</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {errors.color && "Color должно быть получено"}
            <Box sx={{ m: 1, minWidth: 420 }} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Breed</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Breed"
                        onChange={handleChange}
                        {...register("nameBreed", { required: true })}
                    >
                        <MenuItem value="Breedless">Breedless</MenuItem>
                        <MenuItem value="Френчи">Френчи</MenuItem>
                        <MenuItem value="Brittish">Brittish</MenuItem>
                        <MenuItem value="Австралийский мист">Австралийский мист</MenuItem>
                        <MenuItem value="Бенгальская">Бенгальская</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {errors.nameBreed && "Breed должно быть получено"}
            <TextField sx={{ m: 1, minWidth: 420 }} id="outlined-basic" placeholder='Котик должен быть страше 1 года' defaultValue={ageCat} label="Age" variant="outlined" {...register("age", { required: true, min: 1, max: 30 })} />
            {errors.age && "Котик должен быть страше 1 года и младше 30"}
            <TextField sx={{ m: 1, minWidth: 420 }} id="outlined-basic" placeholder='От 1000 до 15000' defaultValue={price} label="Price" variant="outlined" {...register("price", { required: true, min: 1000, max: 15000 })} />
            {errors.price && "Минимальная цена от 1000 до 15000"}
            <Button variant="contained" type="submit" >{title ? 'Edit' : 'Create'}</Button>

        </form >
    );
}

