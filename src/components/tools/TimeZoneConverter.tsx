import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Plus, X } from 'lucide-react';

interface TimeZone {
  id: string;
  label: string;
  offset: string;
}

const timezones: TimeZone[] = [
  { id: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
  { id: 'America/New_York', label: 'Eastern Time (ET)', offset: '-05:00' },
  { id: 'America/Chicago', label: 'Central Time (CT)', offset: '-06:00' },
  { id: 'America/Denver', label: 'Mountain Time (MT)', offset: '-07:00' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: '-08:00' },
  { id: 'America/Anchorage', label: 'Alaska Time (AKT)', offset: '-09:00' },
  { id: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', offset: '-10:00' },
  { id: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00' },
  { id: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+01:00' },
  { id: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: '+01:00' },
  { id: 'Europe/Moscow', label: 'Moscow (MSK)', offset: '+03:00' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+04:00' },
  { id: 'Asia/Kolkata', label: 'India (IST)', offset: '+05:30' },
  { id: 'Asia/Shanghai', label: 'China (CST)', offset: '+08:00' },
  { id: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
  { id: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: '+11:00' },
  { id: 'Pacific/Auckland', label: 'Auckland (NZDT)', offset: '+13:00' }
];

export const TimeZoneConverter = () => {
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().slice(0, 16));
  const [sourceTimezone, setSourceTimezone] = useState('America/New_York');
  const [destinationTimezones, setDestinationTimezones] = useState<string[]>(['UTC', 'Asia/Tokyo']);

  const addDestination = () => {
    if (destinationTimezones.length < 6) {
      const available = timezones.find(tz => !destinationTimezones.includes(tz.id));
      if (available) {
        setDestinationTimezones([...destinationTimezones, available.id]);
      }
    }
  };

  const removeDestination = (id: string) => {
    setDestinationTimezones(destinationTimezones.filter(tz => tz !== id));
  };

  const convertTime = (targetTimezone: string) => {
    try {
      const date = new Date(sourceDate);
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      return formatter.format(date);
    } catch (error) {
      return 'Invalid time';
    }
  };

  const getTimezoneLabel = (id: string) => {
    return timezones.find(tz => tz.id === id)?.label || id;
  };

  const getTimezoneOffset = (id: string) => {
    return timezones.find(tz => tz.id === id)?.offset || '+00:00';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Zone Converter
        </CardTitle>
        <CardDescription>
          Convert times across multiple time zones with daylight saving support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Source Time */}
        <div className="space-y-4">
          <h3 className="font-medium">Source Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input
                type="datetime-local"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Time Zone</Label>
              <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.id} value={tz.id}>
                      {tz.label} ({tz.offset})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Source Time Display */}
        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">
                {getTimezoneLabel(sourceTimezone)}
              </div>
              <div className="text-2xl font-bold">
                {convertTime(sourceTimezone)}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {getTimezoneOffset(sourceTimezone)}
            </div>
          </div>
        </div>

        {/* Destination Times */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Converted Times</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addDestination}
              disabled={destinationTimezones.length >= 6}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Timezone
            </Button>
          </div>

          <div className="space-y-3">
            {destinationTimezones.map((tzId) => (
              <div key={tzId} className="bg-muted/30 rounded-lg p-4 border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Select 
                        value={tzId} 
                        onValueChange={(newId) => {
                          setDestinationTimezones(
                            destinationTimezones.map(id => id === tzId ? newId : id)
                          );
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.id} value={tz.id}>
                              {tz.label} ({tz.offset})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-xl font-bold">
                      {convertTime(tzId)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Offset: {getTimezoneOffset(tzId)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDestination(tzId)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium mb-2">Quick Reference</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div>
              <div className="font-medium">Current UTC:</div>
              <div className="text-muted-foreground">{convertTime('UTC')}</div>
            </div>
            <div>
              <div className="font-medium">Your Local:</div>
              <div className="text-muted-foreground">
                {new Date(sourceDate).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};