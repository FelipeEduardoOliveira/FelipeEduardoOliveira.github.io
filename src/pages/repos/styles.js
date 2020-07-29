import styled from 'styled-components';
import {Link} from 'react-router-dom';


export const Container = styled.div`

    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(186,23,23, 0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Loading = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    justify-items: center;
    justify-self: center;
    height: 100vh;

    h1{
        color: #FFF;
        font-size:30px;
        text-align: center;
    }
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width:150px;
        border-radius: 20%;
        margin: 20px 0 ;
    }

    h1{
        font-size: 30px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height:1.4;
        max-width: 400px;
    }
`;


export const BackButton = styled(Link)`
        border: none;
        outline: 0;
        background-color: transparent;
`;

export const ListIssues = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
        border-top: 1px solid #EEEE;
    }
    }

    

    img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0D2636;
    }

    div{
        flex:1;
        margin-left: 12px;

        p{
            margin-top: 10px;
            font-size: 12px;
            color: #000;
        }

    }

    strong{
        font-size: 15px;

        a{
            text-decoration: none;
            color: #222;
            transition: 0.3s;

            &:hover{
                color: #0071db;
            }
        }

        span{
            background: #222;
            color: #FFF;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 5px 7px;
            margin-left: 7px;
        }
    }
`;

export const ButtonAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 1px solid #0D2636;
        background: #eeee;
        color: #000;
        padding: 8px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;


export const ListFilter = styled.div`

button{
    border: 0;
    padding: 5px;
    margin:5px 5px;
    border-radius: 4px;

    &:nth-child(${props => props.active + 1}){
        background-color: #0071db;
        color: #fff;
    }
}

`;