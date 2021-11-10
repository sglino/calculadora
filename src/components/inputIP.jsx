import { render } from '@testing-library/react';
import { list } from 'postcss';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

//Se llaman las funciones previamente declaradas
const InputIP = ({IP, setIP, Tipo, setTipo, MascaraRed, setMascaraRed, TipoSubNet, setTipoSubNet, nTipoS, 
                setnTipoS, nSubredes, setnSubredes, nHost, setnHost, SubMascara, setSubMascara, LsubRedes, setLsubRedes}) => {

    let bitsHost = 0;
    
// Funcion que retorna el valor insertado
    const handleChange = (e) => {
        setIP(e.target.value);
    }

// Se crea la función para encontrar la clase de direccionamiento IP
    const getTipoIp = (IP) => {
        let tipo = '';
        if(IP >= 1 && IP <= 127){
            tipo = 'A';
            bitsHost = 24;
        }
        else if(IP >= 128 && IP <=191){
            tipo = 'B';
            bitsHost = 16;
        }
        else if(IP >= 192 && IP <=223){
            tipo = 'C'
            bitsHost = 8
        }
        return tipo;
    }

// Se crea la función para encontrar la mascara de red dependiendo de la clase de direccionamiento IP
    function getMascaraDeRed(IP){
        let mascara = '';
        if(IP >= 1 && IP <= 127) mascara = '255.0.0.0';
        else if(IP >= 128 && IP <=191) mascara = '255.255.0.0';
        else if(IP >= 192 && IP <=223) mascara = '255.255.255.0';
        return(mascara);
    }

// Se crea la función para encontrar la mascara de subred 
    const getSubMascara = (IP) => {
        let submascara = '';
        let tsn1 = 'Host';
        let tsn2 = 'Subred'; 
        if(TipoSubNet === tsn1){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) submascara = '255.255.255.254 /31'; 
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.255.255.252 /30';
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.255.255.248 /29';
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.255.255.240 /28';
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.255.255.224 /27';
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.255.255.192 /26';
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.255.255.128 /25';
                else if(nTipoS >= 127 && nTipoS <= 254) submascara = '255.255.255.0 /24';
                else if(nTipoS >= 255 && nTipoS <= 510) submascara = '255.255.254.0 /23';
                else if(nTipoS >= 511 && nTipoS <= 1022) submascara = '255.255.252.0 /22';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) submascara = '255.255.248.0 /21';
                else if(nTipoS >= 2047 && nTipoS <= 4094) submascara = '255.255.240.0 /20';
                else if(nTipoS >= 4095 && nTipoS <= 8190) submascara = '255.255.224.0 /19';
                else if(nTipoS >= 8191 && nTipoS <= 16382) submascara = '255.255.192.0 /18';
                else if(nTipoS >= 16383 && nTipoS <= 32766) submascara = '255.255.128.0 /17';               
                else if(nTipoS >= 32767 && nTipoS <= 65534) submascara = '255.255.0.0 /16';
                else if(nTipoS >= 65535 && nTipoS <= 131070) submascara = '255.254.0.0 /15'; 
                else if(nTipoS >= 131071 && nTipoS <= 262142) submascara = '255.252.0.0 /14'; 
                else if(nTipoS >= 262143 && nTipoS <= 524286) submascara = '255.248.0.0 /13';
                else if(nTipoS >= 524287 && nTipoS <= 1048574) submascara = '255.240.0.0 /12';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) submascara = '255.224.0.0 /11';
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) submascara = '255.192.0.0 /10';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) submascara = '255.128.0.0 /9';
            }
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) submascara = '255.255.255.254 /31';
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.255.255.252 /30';
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.255.255.248 /29';
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.255.255.240 /28';
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.255.255.224 /27'; 
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.255.255.192 /26';
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.255.255.128 /25'; 
                else if(nTipoS >= 127 && nTipoS <= 254) submascara = '255.255.255.0 /24';                
                else if(nTipoS >= 255 && nTipoS <= 510) submascara = '255.255.254.0 /23';              
                else if(nTipoS >= 511 && nTipoS <= 1022) submascara = '255.255.252.0 /22';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) submascara = '255.255.248.0 /21';            
                else if(nTipoS >= 2047 && nTipoS <= 4094) submascara = '255.255.240.0 /20';
                else if(nTipoS >= 4095 && nTipoS <= 8190) submascara = '255.255.224.0 /19';              
                else if(nTipoS >= 8191 && nTipoS <= 16382) submascara = '255.255.192.0 /18';          
                else if(nTipoS >= 16383 && nTipoS <= 32766) submascara = '255.255.128.0 /17';
            }    
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) submascara = '255.255.255.254 /31';              
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.255.255.252 /30';                
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.255.255.248 /29';               
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.255.255.240 /28';             
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.255.255.224 /27';               
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.255.255.192 /26';             
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.255.255.128 /25';
            }
        }

        else if(TipoSubNet === tsn2){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) submascara = '255.128.0.0 /9'; 
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.192.0.0 /10';
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.224.0.0 /11';
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.240.0.0 /12';
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.248.0.0 /13';
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.252.0.0 /14';
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.254.0.0 /15';
                else if(nTipoS >= 127 && nTipoS <= 254) submascara = '255.255.0.0 /16';
                else if(nTipoS >= 255 && nTipoS <= 510) submascara = '255.255.128.0 /17';
                else if(nTipoS >= 511 && nTipoS <= 1022) submascara = '255.255.192.0 /18';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) submascara = '255.255.224.0 /19';
                else if(nTipoS >= 2047 && nTipoS <= 4094) submascara = '255.255.240.0 /20';
                else if(nTipoS >= 4095 && nTipoS <= 8190) submascara = '255.255.248.0 /21';
                else if(nTipoS >= 8191 && nTipoS <= 16382) submascara = '255.255.252.0 /22';
                else if(nTipoS >= 16383 && nTipoS <= 32766) submascara = '255.255.254.0 /23';               
                else if(nTipoS >= 32767 && nTipoS <= 65534) submascara = '255.255.255.0 /24';
                else if(nTipoS >= 65535 && nTipoS <= 131070) submascara = '255.255.255.128 /25'; 
                else if(nTipoS >= 131071 && nTipoS <= 262142) submascara = '255.255.255.192 /26'; 
                else if(nTipoS >= 262143 && nTipoS <= 524286) submascara = '255.255.255.224 /27';
                else if(nTipoS >= 524287 && nTipoS <= 1048574) submascara = '255.255.255.240 /28';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) submascara = '255.255.255.248 /29';
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) submascara = '255.255.255.252 /30';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) submascara = '255.255.255.254 /31';
            }
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) submascara = '255.255.128.0 /17';
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.255.192.0 /18';
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.255.224.0 /19';
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.255.240.0 /20';
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.255.248.0 /21'; 
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.255.252.0 /22';
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.255.254.0 /23'; 
                else if(nTipoS >= 127 && nTipoS <= 254) submascara = '255.255.255.0 /24';                
                else if(nTipoS >= 255 && nTipoS <= 510) submascara = '255.255.255.128 /25';              
                else if(nTipoS >= 511 && nTipoS <= 1022) submascara = '255.255.255.192 /26';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) submascara = '255.255.255.224 /27';            
                else if(nTipoS >= 2047 && nTipoS <= 4094) submascara = '255.255.255.240 /28';
                else if(nTipoS >= 4095 && nTipoS <= 8190) submascara = '255.255.255.248 /29';              
                else if(nTipoS >= 8191 && nTipoS <= 16382) submascara = '255.255.255.252 /30';          
                else if(nTipoS >= 16383 && nTipoS <= 32766) submascara = '255.255.255.254 /31';
            }
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) submascara = '255.255.255.128 /25';              
                else if(nTipoS > 0 && nTipoS < 3) submascara = '255.255.255.192 /26';                
                else if(nTipoS >= 3 && nTipoS <= 6) submascara = '255.255.255.224 /27';               
                else if(nTipoS >= 7 && nTipoS <= 14) submascara = '255.255.255.240 /28';             
                else if(nTipoS >= 15 && nTipoS <= 30) submascara = '255.255.255.248 /29';               
                else if(nTipoS >= 31 && nTipoS <= 62) submascara = '255.255.255.252 /30';             
                else if(nTipoS >= 63 && nTipoS <= 126) submascara = '255.255.255.254 /31';
            }
        }
        return submascara;  
    }

    const getNumHost = (IP) =>{
        let host = '';
        let tsn1 = 'Host';
        let tsn2 = 'Subred';
        if(TipoSubNet === tsn1){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) host = '0';
                else if(nTipoS > 0 && nTipoS < 3) host = '2';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '6';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '14';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '30';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '62';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '126';              
                else if(nTipoS >= 127 && nTipoS <= 254) host = '254';               
                else if(nTipoS >= 255 && nTipoS <= 510) host = '510';               
                else if(nTipoS >= 511 && nTipoS <= 1022) host = '1022';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) host = '2046';               
                else if(nTipoS >= 2047 && nTipoS <= 4094) host = '4094';    
                else if(nTipoS >= 4095 && nTipoS <= 8190) host = '8190';               
                else if(nTipoS >= 8191 && nTipoS <= 16382) host = '16382';               
                else if(nTipoS >= 16383 && nTipoS <= 32766) host = '32766';
                else if(nTipoS >= 32767 && nTipoS <= 65534) host = '65534';
                else if(nTipoS >= 65535 && nTipoS <= 131070) host = '131070';
                else if(nTipoS >= 131071 && nTipoS <= 262142) host = '262142';
                else if(nTipoS >= 262143 && nTipoS <= 524286) host = '524286';
                else if(nTipoS >= 524287 && nTipoS <= 1048574) host = '1048574';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) host = '2097150';
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) host = '4194302';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) host = '8388606';
            }
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) host = '0';
                else if(nTipoS > 0 && nTipoS < 3) host = '2';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '6';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '14';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '30';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '62';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '126';              
                else if(nTipoS >= 127 && nTipoS <= 254) host = '254';               
                else if(nTipoS >= 255 && nTipoS <= 510) host = '510';               
                else if(nTipoS >= 511 && nTipoS <= 1022) host = '1022';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) host = '2046';               
                else if(nTipoS >= 2047 && nTipoS <= 4094) host = '4094';    
                else if(nTipoS >= 4095 && nTipoS <= 8190) host = '8190';               
                else if(nTipoS >= 8191 && nTipoS <= 16382) host = '16382';               
                else if(nTipoS >= 16383 && nTipoS <= 32766) host = '32766';
            }
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) host = '0';
                else if(nTipoS > 0 && nTipoS < 3) host = '2';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '6';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '14';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '30';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '62';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '126';
            }
        }
        else if(TipoSubNet === tsn2){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) host = '8388606';
                else if(nTipoS > 0 && nTipoS < 3) host = '4194302';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '2097150';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '1048574';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '524286';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '262142';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '131070';              
                else if(nTipoS >= 127 && nTipoS <= 254) host = '65534';               
                else if(nTipoS >= 255 && nTipoS <= 510) host = '32766';               
                else if(nTipoS >= 511 && nTipoS <= 1022) host = '16382';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) host = '8190';               
                else if(nTipoS >= 2047 && nTipoS <= 4094) host = '4094';    
                else if(nTipoS >= 4095 && nTipoS <= 8190) host = '2046';               
                else if(nTipoS >= 8191 && nTipoS <= 16382) host = '1022';               
                else if(nTipoS >= 16383 && nTipoS <= 32766) host = '510';
                else if(nTipoS >= 32767 && nTipoS <= 65534) host = '254';
                else if(nTipoS >= 65535 && nTipoS <= 131070) host = '126';
                else if(nTipoS >= 131071 && nTipoS <= 262142) host = '62';
                else if(nTipoS >= 262143 && nTipoS <= 524286) host = '30';
                else if(nTipoS >= 524287 && nTipoS <= 1048574) host = '14';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) host = '6';
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) host = '2';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) host = '0';
            }
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) host = '32766';
                else if(nTipoS > 0 && nTipoS < 3) host = '16382';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '8190';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '4094';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '2046';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '1022';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '510';              
                else if(nTipoS >= 127 && nTipoS <= 254) host = '254';               
                else if(nTipoS >= 255 && nTipoS <= 510) host = '126';               
                else if(nTipoS >= 511 && nTipoS <= 1022) host = '62';               
                else if(nTipoS >= 1023 && nTipoS <= 2046) host = '30';               
                else if(nTipoS >= 2047 && nTipoS <= 4094) host = '14';    
                else if(nTipoS >= 4095 && nTipoS <= 8190) host = '6';               
                else if(nTipoS >= 8191 && nTipoS <= 16382) host = '2';               
                else if(nTipoS >= 16383 && nTipoS <= 32766) host = '0';
            }
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) host = '126';
                else if(nTipoS > 0 && nTipoS < 3) host = '62';
                else if(nTipoS >= 3 && nTipoS <= 6) host = '30';
                else if(nTipoS >= 7 && nTipoS <= 14) host = '14';               
                else if(nTipoS >= 15 && nTipoS <= 30) host = '6';
                else if(nTipoS >= 31 && nTipoS <= 62) host = '2';              
                else if(nTipoS >= 63 && nTipoS <= 126) host = '0';
            }
        } 
        return host;
    }

    const getSubRedes = (IP) =>{
        let subred = '';
        let tsn1 = 'Host';
        let tsn2 = 'Subred';
        if(TipoSubNet === tsn1){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) subred = '8388606';          
                else if(nTipoS > 0 && nTipoS < 3) subred = '4194302';          
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '2097150';            
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '1048574';          
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '524286';          
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '262142';      
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '131070';          
                else if(nTipoS >= 127 && nTipoS <= 254) subred = '65534';          
                else if(nTipoS >= 255 && nTipoS <= 510) subred = '32766';      
                else if(nTipoS >= 511 && nTipoS <= 1022) subred = '16382';        
                else if(nTipoS >= 1023 && nTipoS <= 2046) subred = '8190';          
                else if(nTipoS >= 2047 && nTipoS <= 4094) subred = '4094';     
                else if(nTipoS >= 4095 && nTipoS <= 8190) subred = '2046';         
                else if(nTipoS >= 8191 && nTipoS <= 16382) subred = '1022';
                else if(nTipoS >= 16383 && nTipoS <= 32766) subred = '510';     
                else if(nTipoS >= 32767 && nTipoS <= 65534) subred = '254';
                else if(nTipoS >= 65535 && nTipoS <= 131070) subred = '126';
                else if(nTipoS >= 131071 && nTipoS <= 262142) subred = '62';      
                else if(nTipoS >= 262143 && nTipoS <= 524286) subred = '30';            
                else if(nTipoS >= 524287 && nTipoS <= 1048574) subred = '14';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) subred = '6';   
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) subred = '2';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) subred = '0';
            } 
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) subred = '32766';          
                else if(nTipoS > 0 && nTipoS < 3) subred = '16382';         
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '8190';           
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '4094';        
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '2046';        
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '1022';    
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '510';   
                else if(nTipoS >= 127 && nTipoS <= 254) subred = '254';
                else if(nTipoS >= 255 && nTipoS <= 510) subred = '126';      
                else if(nTipoS >= 511 && nTipoS <= 1022) subred = '62'; 
                else if(nTipoS >= 1023 && nTipoS <= 2046) subred = '30';        
                else if(nTipoS >= 2047 && nTipoS <= 4094) subred = '14';        
                else if(nTipoS >= 4095 && nTipoS <= 8190) subred = '6';          
                else if(nTipoS >= 8191 && nTipoS <= 16382) subred = '2';      
                else if(nTipoS >= 16383 && nTipoS <= 32766) subred = '0';
            }  
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) subred = '126';  
                else if(nTipoS > 0 && nTipoS < 3) subred = '62';        
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '30';   
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '14';           
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '6'        
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '2';    
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '0';
            }
        }
        else if(TipoSubNet === tsn2){
            if(IP >= 1 && IP <= 127){
                if(nTipoS === 0) subred = '0';          
                else if(nTipoS > 0 && nTipoS < 3) subred = '2';          
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '6';            
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '14';          
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '30';          
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '62';      
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '126';          
                else if(nTipoS >= 127 && nTipoS <= 254) subred = '254';          
                else if(nTipoS >= 255 && nTipoS <= 510) subred = '510';      
                else if(nTipoS >= 511 && nTipoS <= 1022) subred = '1022';        
                else if(nTipoS >= 1023 && nTipoS <= 2046) subred = '2046';          
                else if(nTipoS >= 2047 && nTipoS <= 4094) subred = '4094';     
                else if(nTipoS >= 4095 && nTipoS <= 8190) subred = '8190';         
                else if(nTipoS >= 8191 && nTipoS <= 16382) subred = '16382';
                else if(nTipoS >= 16383 && nTipoS <= 32766) subred = '32766';     
                else if(nTipoS >= 32767 && nTipoS <= 65534) subred = '65534';
                else if(nTipoS >= 65535 && nTipoS <= 131070) subred = '131070';
                else if(nTipoS >= 131071 && nTipoS <= 262142) subred = '262142';      
                else if(nTipoS >= 262143 && nTipoS <= 524286) subred = '524286';            
                else if(nTipoS >= 524287 && nTipoS <= 1048574) subred = '1048574';
                else if(nTipoS >= 1048575 && nTipoS <= 2097150) subred = '2097150';   
                else if(nTipoS >= 2097151 && nTipoS <= 4194302) subred = '4194302';
                else if(nTipoS >= 4194303 && nTipoS <= 8388606) subred = '8388606';
            } 
            else if(IP >= 128 && IP <=191){
                if(nTipoS === 0) subred = '0';          
                else if(nTipoS > 0 && nTipoS < 3) subred = '2';          
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '6';            
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '14';          
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '30';          
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '62';      
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '126';          
                else if(nTipoS >= 127 && nTipoS <= 254) subred = '254';          
                else if(nTipoS >= 255 && nTipoS <= 510) subred = '510';      
                else if(nTipoS >= 511 && nTipoS <= 1022) subred = '1022';        
                else if(nTipoS >= 1023 && nTipoS <= 2046) subred = '2046';          
                else if(nTipoS >= 2047 && nTipoS <= 4094) subred = '4094';     
                else if(nTipoS >= 4095 && nTipoS <= 8190) subred = '8190';         
                else if(nTipoS >= 8191 && nTipoS <= 16382) subred = '16382';
                else if(nTipoS >= 16383 && nTipoS <= 32766) subred = '32766';
            }  
            else if(IP >= 192 && IP <=223){
                if(nTipoS === 0) subred = '0';          
                else if(nTipoS > 0 && nTipoS < 3) subred = '2';          
                else if(nTipoS >= 3 && nTipoS <= 6) subred = '6';            
                else if(nTipoS >= 7 && nTipoS <= 14) subred = '14';          
                else if(nTipoS >= 15 && nTipoS <= 30) subred = '30';          
                else if(nTipoS >= 31 && nTipoS <= 62) subred = '62';      
                else if(nTipoS >= 63 && nTipoS <= 126) subred = '126';
            }
        }    
        return subred;
    }

    /*const getLsubRedes = (IP) =>{
        let lsubredes='';
        let i=0;
        if(IP >= 128 && IP <=191){
            for (i=IP; i<=191; ++i){
                lsubredes += IP+'.0.'+i+'\n';
            }
        }
        return lsubredes;
    }*/

    function clasificaIP(ip){
        let nuevaIP = ip.split('.');
        setTipo(getTipoIp(nuevaIP[0]));
        setMascaraRed(getMascaraDeRed(nuevaIP[0]));
        setSubMascara(getSubMascara(nuevaIP[0]));
        setnSubredes(getSubRedes(nuevaIP[0]));
        setnHost(getNumHost(nuevaIP[0]));
        //setLsubRedes(getLsubRedes(nuevaIP[0]));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        clasificaIP(IP)
        
    }

    return (
        <div className="flex flex-col justify-around gap-10">
           <div className="flex justify-around gap-10">
            <form 
                    onSubmit={handleSubmit}
                    className="flex gap-2 items-center"
                >
                    <label htmlFor="ip">Dirección ip:</label>
                    <input 
                        className="border shadow-lg p-3 rounded-lg"
                        value={IP} 
                        onChange={handleChange}
     
                        type="text" 
                        placeholder="192.168.124.0" 
                        id="ip" 
                        name="ip"/>
                    <button className="text-white bg-blue-600 p-3 w-28 rounded-md">Enviar</button>
                </form>
                <div className="p-2 bg-white shadow-lg">
                    <h2>Clase: {Tipo}</h2>
                    <h2>Mascara de red: {MascaraRed} </h2>
                </div>
           </div>
            <div className="flex gap-10 items-center">
                <select 
                    onChange={(e) => setTipoSubNet(e.target.value)}
                    value={TipoSubNet} 
                    className="bg-white shadow-lg p-3 rounded-md" id="TipoSubNet" name="TipoSubNet"
                >    
                    <option>Host</option>
                    <option>Subred</option>
                </select>
                <div>
                    <input
                        onChange={(e) => setnTipoS(e.target.value)}
                        value={nTipoS}
                        className=" p-3 border rounded-md shadow-lg" type="number" id="nTipoS" name="nTipoS"/>
                </div>
                <div className="p-2 bg-white shadow-lg">
                    <h2>Subredes: {nSubredes} </h2>
                    <h2>Host por subred: {nHost} </h2>
                    <h2>Mascara de subred: {SubMascara} </h2>
                </div>
            </div>
            {/*
            <div className="flex gap-10 items-center">
            <div className="p-2 bg-white shadow-lg">
                    <h2>Lista Subredes: </h2>
                    <ol>
                       <li>{LsubRedes}</li>
                    </ol>
                </div>
            </div> */}
        </div>
    )
}

export default InputIP
