'use client';
import React, { useEffect, useState } from 'react';
import Dropdown from './common/Dropdown';
import Button from './common/Button';
import { getChampionshipsFromApi, getGroupFromApi, getTeamFromApiByGroup, getTerritoriesFromApi } from '@/services/api';
import { getAllSeasonsOptions, getSeason } from '@/helpers/season';
import { Option } from '@/types';
import { navigate } from '@/helpers/navigation';

const Filter: React.FC = () => {
    const seasons: Option[] = getAllSeasonsOptions(2020).reverse();

    // Options
    const [seasonOptions, setSeasonOptions] = useState<Option[]>();
    const [territoryOptions, setTerritoryOptions] = useState<Option[]>();
    const [championshipOptions, setChampionshipOptions] = useState<Option[]>();
    const [groupOptions, setGroupOptions] = useState<Option[]>();
    const [teamOptions, setTeamOptions] = useState<Option[]>();

    // Selected
    const [selectedSeason, setSelectedSeason] = useState<Option | null>(seasons[0]);
    const [selectedTerritory, setSelectedTerritory] = useState<Option | null>(null);
    const [selectedChampionship, setSelectedChampionship] = useState<Option | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<Option | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<Option | null>(null);

    // Season
    useEffect(() => {
        if (!seasonOptions) {
            setSeasonOptions(seasons);
        }
    }, [seasonOptions]);

    // Territory
    useEffect(() => {
        if (!territoryOptions) {
            getTerritoriesFromApi().then((territories) => {
                const options: Option[] = territories.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
                setTerritoryOptions(options)
            });
        }
    }, [territoryOptions]);

    // Championship
    useEffect(() => {
        if (selectedSeason != null && selectedTerritory != null && !championshipOptions) {
            getChampionshipsFromApi(getSeason(selectedSeason.id), selectedTerritory.id).then((championships) => {
                const options: Option[] = championships.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
                setChampionshipOptions(options);
            });
        }
    }, [championshipOptions]);

    // Group
    useEffect(() => {
        if (selectedSeason != null && selectedChampionship != null && !groupOptions) {
            getGroupFromApi(getSeason(selectedSeason.id), selectedTerritory!.id, selectedChampionship.id).then((groups) => {
                const options: Option[] = groups.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
                setGroupOptions(options);
            });
        }
    });

    // Team
    useEffect(() => {
        if (selectedGroup != null && !teamOptions) {
            getTeamFromApiByGroup(selectedGroup.id).then((teams) => {
                const options: Option[] = teams.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
                setTeamOptions(options);
            });
        }
    });

    const handleSelectSeason = (option: Option) => {
        setSelectedTerritory(null);
        setSelectedChampionship(null);
        setSelectedGroup(null);
        setSelectedTeam(null);
        setSelectedSeason(option);
    }

    const handleSelectTerritory = (option: Option) => {
        setSelectedChampionship(null);
        setSelectedGroup(null);
        setSelectedTeam(null);
        setSelectedTerritory(option);

        getChampionshipsFromApi(getSeason(selectedSeason!.id), option.id).then((championships) => {
            const options: Option[] = championships.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
            setChampionshipOptions(options);
        });
    }

    const handleSelectChampionship = (option: Option) => {
        setSelectedGroup(null);
        setSelectedTeam(null);
        setSelectedChampionship(option);

        getGroupFromApi(getSeason(selectedSeason!.id), selectedTerritory!.id, option.id).then((groups) => {
            const options: Option[] = groups.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
            setGroupOptions(options);
        });
    }

    const handleSelectGroup = (option: Option) => {
        setSelectedTeam(null);
        setSelectedGroup(option);

        getTeamFromApiByGroup(option.id).then((teams) => {
            const options: Option[] = teams.map((option: { id: number; name: string }) => ({ id: option.id, label: option.name }));
            setTeamOptions(options);
        });
    }

    const handleSelectTeam = (option: Option) => {
        setSelectedTeam(option);
    }

    const handleReset = () => {
        setSelectedTerritory(null);
        setSelectedChampionship(null);
        setSelectedGroup(null);
        setSelectedTeam(null);
        setSelectedSeason(null);
    }

    const handleSubmit = () => {
        navigate(selectedSeason!.id, selectedTeam!.id, selectedTerritory!.id, selectedChampionship!.id, selectedGroup!.id);
    }

    return (
        <div>
            <div className='row gy-3 gx-2 mb-3 row-cols-1 row-cols-lg-5 '>
                <div className='col'>
                    <Dropdown dropDownMenuProps={{ options: seasonOptions || [], defaultLabel: 'Seleziona una stagione' }} selectedOption={selectedSeason} handleSelect={handleSelectSeason} />
                </div>
                <div className='col'>
                    <Dropdown dropDownMenuProps={{ options: territoryOptions || [], defaultLabel: 'Seleziona un territorio' }} selectedOption={selectedTerritory} handleSelect={handleSelectTerritory} />
                </div>
                <div className='col'>
                    <Dropdown dropDownMenuProps={{ options: championshipOptions || [], defaultLabel: 'Seleziona un campionato' }} selectedOption={selectedChampionship} handleSelect={handleSelectChampionship} />
                </div>
                <div className='col'>
                    <Dropdown dropDownMenuProps={{ options: groupOptions || [], defaultLabel: 'Seleziona un girone' }} selectedOption={selectedGroup} handleSelect={handleSelectGroup} />
                </div>
                <div className='col'>
                    <Dropdown dropDownMenuProps={{ options: teamOptions || [], defaultLabel: 'Seleziona una squadra' }} selectedOption={selectedTeam} handleSelect={handleSelectTeam} />
                </div>
            </div>
            <div className='row gy-3 row-cols-1 row-cols-lg-2 text-center '>
                <div className='col'>
                    <Button variant='success' label='Cerca' handleClick={handleSubmit} />
                </div>
                <div className='col'>
                    <Button variant='outline-danger' label='Reset' handleClick={handleReset}/>
                </div>
            </div>
        </div>
    );
};

export default Filter;
