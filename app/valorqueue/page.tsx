"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Input, Button } from "@nextui-org/react";

type QueueItem = {
    id: string;
    name: string;
    url: string;
};

const ValorQueuePage: React.FC = () => {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const res = await fetch('/api/queue');
                if (!res.ok) throw new Error(`Failed to fetch, status: ${res.status}`);
                const queueData = await res.json();
                console.log("Fetched Queue Data:", queueData); // Debugging line
                setQueue(Array.isArray(queueData) ? queueData : []);
            } catch (err) {
                setError(`Error fetching queue: ${err instanceof Error ? err.message : String(err)}`);
            }
        };

        fetchQueue();
    }, []);

    const addToQueue = async (name: string, url: string) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, url }),
            });
            if (!res.ok) throw new Error('Failed to add name and URL');
            const newItem: QueueItem = await res.json();
            console.log("Added Item:", newItem); // Debugging line
            setQueue(currentQueue => [...currentQueue, newItem]);
        } catch (err) {
            setError(`Error adding name and URL: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !url.trim()) {
            setError('Name and URL are required');
            return;
        }
        await addToQueue(name, url);
        setName('');
        setUrl('');
        setError('');
    };

    console.log("Queue State:", queue); // Debugging line

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input clearable bordered labelPlaceholder="Name" className='mt-2' value={name} onChange={handleNameChange} aria-label="Name" />
                <Input clearable bordered labelPlaceholder="URL" className='mt-2' value={url} onChange={handleUrlChange} aria-label="URL" />
                <Button auto color="primary" type="submit" disabled={isSubmitting} className='mt-8'>Add to Queue</Button>
            </form>
            {queue.map((item, index) => {
                return (
                    <div key={item.id || index}> {/* Use item.id or index as fallback for key */}
                        <Card className="mt-4">
                            <CardHeader>Queue #{item.id} - {item.name}</CardHeader>
                            <img src={item.url} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};

export default ValorQueuePage;