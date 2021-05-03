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

function TemplateCard({
    key,
    title,
    author,
    description,
    templateUid,
    userUid,
    lastEdited,
    data
}) {
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
                        onClick={() => handleDelTemplateFromFirebase(userUid, templateUid)}
                        className="delete-icon">
                        <DeleteOutlineIcon
                            style={{
                            color: '#9ea7da'
                        }}/>
                    </IconButton>
                </div>
                <Tooltip
                    title={< p className = "title-tooltip-text" > { title } </p> }
                    className="title-tooltip"
                    arrow >
                    <Typography variant="h5" component="h2" noWrap={true}>
                        {title}
                    </Typography>
                </Tooltip>
                {/* <Typography color="textSecondary" className="author-text"> */}
                <p className="author-text">by: {author}</p>
                <Typography color="textSecondary" variant="body2" gutterBottom>
                    Last Edited: {lastEdited}
                </Typography>
                {/* </Typography> */}
                <Tooltip
                    title={<p className = "descrip-tooltip-text"> { description } </p>}
                    className="title-tooltip"
                    arrow >
                    <Typography variant="body2" component="p" className="description" noWrap={true}>
                        {description}
                    </Typography>
                </Tooltip>
            </CardContent>
            <CardActions className="card-actions">
                <Button size="small">
                    <Link
                        to={{
                        pathname: `/contract-drafting-tool/user/${userUid}/edit/${templateUid}`,
                        state: {
                            data: data
                        }
                    }}>Edit</Link>
                </Button>
                <Button size="small" className="button-right">
                    <Link
                        to={{
                        pathname: `/contract-drafting-tool/user/${userUid}/fill/${templateUid}`,
                        state: {
                            data: data,
                            author: data.author,
                            description: description,
                            clauses: data.clauses,
                            title: title,
                            vars: data.vars,
                            varDescs: data.varDescs
                        }
                    }}>Generate</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

export default TemplateCard
