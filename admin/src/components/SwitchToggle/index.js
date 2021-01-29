import React, { useState } from 'react';
import { Toggle } from '@buffetjs/core';
import VerticalContainer from "../Container/VerticalContainer";

export function SwitchToggle({ toggleValue, onValueChange }) {
    return (
        <Toggle
            name="toggle"
            value={toggleValue}
            onChange={({ target: { value } }) => onValueChange(value)}
        />
    )
}