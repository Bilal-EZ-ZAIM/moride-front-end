import React, { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { Button } from '../common/Button';

export function WorkSchedule() {
  const [schedule, setSchedule] = useState({
    monday: { start: "08:00", end: "18:00", active: true },
    tuesday: { start: "08:00", end: "18:00", active: true },
    wednesday: { start: "08:00", end: "18:00", active: true },
    thursday: { start: "08:00", end: "18:00", active: true },
    friday: { start: "08:00", end: "20:00", active: true },
    saturday: { start: "09:00", end: "16:00", active: true },
    sunday: { start: "09:00", end: "14:00", active: false }
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Horaires de Travail</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>
      
      <div className="space-y-4">
        {Object.entries(schedule).map(([day, hours]) => (
          <div key={day} className="flex items-center gap-4">
            <div className="w-32">
              <span className="font-medium capitalize">{day}</span>
            </div>
            <input
              type="checkbox"
              checked={hours.active}
              onChange={(e) => setSchedule({
                ...schedule,
                [day]: { ...hours, active: e.target.checked }
              })}
              className="rounded text-emerald-600"
            />
            <input
              type="time"
              value={hours.start}
              onChange={(e) => setSchedule({
                ...schedule,
                [day]: { ...hours, start: e.target.value }
              })}
              className="border rounded-lg p-2"
              disabled={!hours.active}
            />
            <span>-</span>
            <input
              type="time"
              value={hours.end}
              onChange={(e) => setSchedule({
                ...schedule,
                [day]: { ...hours, end: e.target.value }
              })}
              className="border rounded-lg p-2"
              disabled={!hours.active}
            />
          </div>
        ))}
      </div>
    </div>
  );
}