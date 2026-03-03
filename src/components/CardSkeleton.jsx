import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
  return (
    <div>
      <Card className="w-75 h-96 mx-auto overflow-hidden">
      
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    </Card>
    </div>
  )
}

export default CardSkeleton
