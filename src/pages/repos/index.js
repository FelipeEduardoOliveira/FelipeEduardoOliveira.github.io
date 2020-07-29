import React, {useState, useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {Container, Owner,Loading, BackButton, ListIssues, ButtonAction, ListFilter} from './styles';
import api from '../../services/api';

//

export default function Repositorio({match}){

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filterIndex, setFilterIndex] = useState(0);
    const [filters, setFilters] = useState([
        {state: 'all', label:'Todas', /*active: true*/},
        {state: 'open', label:'Abertos', /*active: false*/},
        {state: 'closed', label:'Fechados', /*active: false*/}
    ]);

    
    
    useEffect(()=>{

        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const [repositorioData, issuesData ] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`,{
                    params:{
                        state: 'all',//filters.find(f => f.active).state,
                        per_page: 5
                    }
                })
            ])
            
            setRepositorio(repositorioData.data);
            
            setIssues(issuesData.data);
            // console.log(issuesData.data);
            setLoading(false);
        }

        load();
    },[match.params.repositorio]);
    
    useEffect(()=>{

        async function loadIssue(){
            
        const nomeRepo = decodeURIComponent(match.params.repositorio);

        const response = await api.get(`/repos/${nomeRepo}/issues`,{
            params:{
                state: filters[filterIndex].state,
                page,
                per_page: 5
            }
        })

        setIssues(response.data);
        }

        loadIssue();


    }, [filters, filterIndex,page]);

    function handlePage(action){

        setPage(action === 'back' ? page -1 : page +1);
        
    }
    
    function handleFilter(pos){
        setFilterIndex(pos);
    }


    if(loading){
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        );        
    }

    
    return(
           
        <Container>

        


            <BackButton to='/'>
                <FaArrowLeft color="#000" size={25}/>
            </BackButton>
            <Owner>
                <img 
                src={repositorio.owner.avatar_url}
                alt={repositorio.owner.login}
                />
                

                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>

            </Owner>


            <ListFilter active={filterIndex}>
            {filters.map((filter, index) => (
                <button
                type='button'
                key={filter.label}
                onClick={()=>handleFilter(index)}
                >
                    {filter.label}

                </button>
            ))}
        </ListFilter>

            <ListIssues>
                {issues.map(item=>{
                    return(
                        <li key={String(item.id)}>

                            <img src={item.user.avatar_url} 
                            alt={item.user.login}
                            />

                            <div>
                                <strong>
                                    <a href={item.html_url}>{item.title}</a>

                                    {item.labels.map(label => {
                                        return(
                                            <span key={label.id}> {label.name} </span>
                                        );
                                    })}
                                </strong>

                                    <p> {item.user.login} </p>

                            </div>

                        </li>
                    );
                })}
            </ListIssues>

            <ButtonAction>
                <button type='button'
                onClick={()=> handlePage('back')}
                disabled={page < 2}
                > Voltar </button>


                <button type='button' 
                onClick={()=> handlePage('next')}
                // disabled={}
                > Proximo </button>

            </ButtonAction>
        </Container>
    );
}