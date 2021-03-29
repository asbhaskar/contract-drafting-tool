import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {delTemplateFromFirebase} from '../../firebase/firebase.utils';
import {Link} from 'react-router-dom';
import './TemplateCard.css';

function TemplateCard(props) {
    const [deleted, setDeleted] = useState(false);

    const handleDelTemplateFromFirebase = (userUid, templateUid) => {
        delTemplateFromFirebase(userUid, templateUid)
        setDeleted(true)
    }

    return (
        <Card
            variant="outlined"
            className={`card-base ${ (deleted) ? "hide" : "card-container"} `}>
            <CardContent>
                <div className="card-top">
                    <Typography color="textSecondary" gutterBottom>
                        Template
                    </Typography>
                    <IconButton
                        onClick={() => handleDelTemplateFromFirebase(props.userUid, props.templateUid)}
                        className="delete-icon">
                        <DeleteOutlineIcon
                            style={{
                            color: '#9ea7da'
                        }}/>
                    </IconButton>
                </div>
                <Tooltip
                    title={< p className = "title-tooltip-text" > { props.title } </p> }
                    className="title-tooltip"
                    arrow >
                    <Typography variant="h5" component="h2" noWrap={true}>
                        {props.title}
                    </Typography>
                </Tooltip>
                {/* <Typography color="textSecondary" className="author-text"> */}
                <p className="author-text">by: {props.author}</p>
                <Typography color="textSecondary" variant="body2" gutterBottom>
                    Last Edited: {props.lastEdited}
                </Typography>
                {/* </Typography> */}
                <Tooltip
                    title={<p className = "descrip-tooltip-text"> { props.description } </p>}
                    className="title-tooltip"
                    arrow >
                    <Typography variant="body2" component="p" className="description" noWrap={true}>
                        {props.description}
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions className="card-actions">
                <Button size="small">
                    <Link
                        to={{
                        pathname: `/contract-drafting-tool/user/${props.userUid}/edit/${props.templateUid}`,
                        state: {
                            data: props.data
                        }
                    }}>Edit</Link>
                </Button>
                <Button size="small" className="button-right">
                    <Link
                        to={{
                        pathname: `/contract-drafting-tool/user/${props.userUid}/fill/${props.templateUid}`,
                        state: {
                            data: props.data,
                            author: props.data.author,
                            description: props.description,
                            clauses: props.data.clauses,
                            title: props.title,
                            vars: props.data.vars,
                            varDescs: props.data.varDescs
                        }
                    }}>Generate</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

export default TemplateCard
