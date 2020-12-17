import React from "react";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
const BackButton = () => {
    const history = useHistory()
    const handleClick = () => {
        history.goBack()
    }
    return (
        <IconButton  onClick={handleClick} style={{ marginRight: 20 }} color='primary'>
            <ArrowBackIcon/>
        </IconButton>
    )
}
export default BackButton
