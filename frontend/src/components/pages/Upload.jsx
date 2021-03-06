import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    Button,
    CircularProgress,
    Input,
    Container,
    makeStyles
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import firebase from '../../utils/firebase';
import { uploadVideos } from '../../redux/actions/videos';
import { setAlert } from '../../redux/actions/ui';
import { Alert } from '../shared';
import VideoList from '../library/VideoList';

const useMyStyles = makeStyles((theme) => ({
    uploadInput: {
        display: 'none'
    },
    uploadButton: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(12)
    }
}));

const Upload = ({ uploadVideos, alert, uploadedVideos }) => {
    const [spinner, setSpinner] = useState(false)
    const [videos, setVideos] = useState(false)
    const classes = useMyStyles();

    const handleVideoSelected = async (event) => {
        setSpinner(true)
        const arrFiles = []
        Array.from(event.target.files).forEach(file => arrFiles.push(file))
        const arrVideos = await firebase.uploadMultipleFiles(arrFiles)
        uploadVideos(arrVideos)
        setVideos(arrVideos)
        setSpinner(false)
    }

    console.log('uploadedVideos', uploadedVideos)
    return <>
        {alert && <Alert level={alert.level}>{alert.message}</Alert>}

        {!uploadedVideos &&
            <Container maxWidth="lg" className={classes['uploadButton']}>
                <Input
                    className={clsx(classes['uploadInput'])}
                    id="file-upload"
                    inputProps={{ multiple: true, accept: "video/*" }}
                    type="file"
                    onChange={handleVideoSelected}
                    disableUnderline
                />

                <label className={clsx(classes['uploadButton'])} htmlFor="file-upload">
                    <Button color="primary" variant="contained" component="span">
                        SUBIR
                    </Button>
                </label>

                {spinner && <CircularProgress className={clsx(classes['progress'])} />}

            </Container>}

        {videos && <VideoList videos={uploadedVideos} />}
    </>
}

const mapStateToProps = ({ ui: { alert, redirect }, videos: { uploadedVideos } }) => ({ alert: alert || redirect.alert, uploadedVideos });
export default connect(mapStateToProps, { uploadVideos, setAlert })(withRouter(Upload));
