"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FcIdea } from 'react-icons/fc';
// import { getAllCities } from '@/lib/server-actions';
import { Allcities } from '@/components/ui/allcities';

const City =  () => {
  
  return (
  <div>
    <Allcities />
  </div>
  );
};

export default City;
