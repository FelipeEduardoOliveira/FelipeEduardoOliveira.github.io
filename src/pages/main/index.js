import React, {useState, useCallback, useEffect} from 'react';
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import api from '../../services/api';
import {Container, Form, SubmitButton, List, DelButton} from './style';
import {Link} from 'react-router-dom';

export default function Main(){

const [newRepo, setNewRepo] = useState('');
const [repositorios, setRepositorios] = useState([]);
const [loading, setLoading] = useState(false);
const [alerta, setAlerta] = useState(false);

// Buscando repositorios no localStorage
useEffect(()=>{
    const storageRepos = localStorage.getItem('repos');

    if(storageRepos){
        setRepositorios(JSON.parse(storageRepos));
    }
},[])

// Salvando repositorios no localStorage

useEffect(()=>{
    localStorage.setItem('repos',JSON.stringify(repositorios));
},[repositorios]);


const handleSubmit = useCallback((e)=>{
    e.preventDefault();
   
    async function submit(){
        setLoading(true);
    try {
        if(newRepo === ''){
            throw new Error('Digite um repositório');
            
        }
    const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find(repos => repos.name === newRepo);

        if(hasRepo){
            throw new Error('O Repositorio digitado ja existe');
            
        }

    const data = {
        name: response.data.full_name,
    }
    
     setRepositorios([...repositorios, data]);
     
 
     setNewRepo('');
    
    } catch (error) {
        setAlerta(true);
        console.log(error);
    }finally{
        setLoading(false);
    }
}
    

   submit();
    


}, [newRepo, setRepositorios]);

function handleInput(e){
    setNewRepo(e.target.value);
    setAlerta(false);
    
}


const deleteRepos = useCallback((repos)=>{
        const find = repositorios.filter(r => r.name !== repos);

        setRepositorios(find);
}, [repositorios]);

return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus repositorios
            </h1>

            <Form onSubmit={handleSubmit} Erro={alerta}>
                <input type='text'
                 placeholder='Adicionar repositorio'
                 value={newRepo} 
                 onChange={handleInput}/>

                <SubmitButton Load={loading ? 1 : 0}>

                        {loading ? (
                            <FaSpinner color='#FFF' size={14}/>
                        ) : (
                            <FaPlus color='#FFF' size={14}/>
                        )}

                    
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repos=>(
                    <li>
                        <span>
                            <DelButton onClick={()=>deleteRepos(repos.name)}>
                                <FaTrash size={14}/>
                            </DelButton>
                            {repos.name}
                        </span>
                        
                        <Link to={`/repositorio/${encodeURIComponent(repos.name)}`}>
                            <FaBars size={20}/>
                        </Link>

                    </li>
                ))}
            </List>
        </Container>
    );
}