import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await prisma.sharedTrip.deleteMany()
    await prisma.note.deleteMany()
    await prisma.checklistItem.deleteMany()
    await prisma.activity.deleteMany()
    await prisma.budget.deleteMany()
    await prisma.stop.deleteMany()
    await prisma.trip.deleteMany()
    await prisma.city.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Cleared existing data')

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    const users = await prisma.user.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: hashedPassword,
          role: 'USER'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: hashedPassword,
          role: 'USER'
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'ADMIN'
        }
      ]
    })

    console.log('👥 Created sample users')

    // Get created users
    const createdUsers = await prisma.user.findMany()
    const john = createdUsers.find(u => u.email === 'john@example.com')
    const jane = createdUsers.find(u => u.email === 'jane@example.com')

    // Create sample cities
    const cities = await prisma.city.createMany({
      data: [
        {
          name: 'Paris',
          country: 'France',
          description: 'The City of Light, famous for the Eiffel Tower, Louvre Museum, and romantic atmosphere.',
          latitude: 48.8566,
          longitude: 2.3522,
          imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Tokyo',
          country: 'Japan',
          description: 'A bustling metropolis blending ultramodern technology with traditional culture.',
          latitude: 35.6762,
          longitude: 139.6503,
          imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'New York',
          country: 'United States',
          description: 'The Big Apple, known for its iconic skyline, Central Park, and diverse culture.',
          latitude: 40.7128,
          longitude: -74.0060,
          imageUrl: 'https://images.unsplash.com/photo-1496442226665-8d4d0e62e6e9?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'London',
          country: 'United Kingdom',
          description: 'Historic capital with Big Ben, Tower Bridge, and world-class museums.',
          latitude: 51.5074,
          longitude: -0.1278,
          imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Santorini',
          country: 'Greece',
          description: 'Beautiful Greek island known for stunning sunsets and white-washed buildings.',
          latitude: 36.3932,
          longitude: 25.4615,
          imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Dubai',
          country: 'United Arab Emirates',
          description: 'Modern city with luxury shopping, ultramodern architecture, and vibrant nightlife.',
          latitude: 25.2048,
          longitude: 55.2708,
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Bali',
          country: 'Indonesia',
          description: 'Tropical paradise known for beaches, rice terraces, and spiritual retreats.',
          latitude: -8.3405,
          longitude: 115.0920,
          imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Barcelona',
          country: 'Spain',
          description: 'Coastal city famous for Gaudí architecture, beaches, and vibrant culture.',
          latitude: 41.3851,
          longitude: 2.1734,
          imageUrl: 'https://images.unsplash.com/photo-1513499793645-2ea1a27e6e8c?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Rome',
          country: 'Italy',
          description: 'Eternal city with ancient ruins, Vatican City, and incredible Italian cuisine.',
          latitude: 41.9028,
          longitude: 12.4964,
          imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Amsterdam',
          country: 'Netherlands',
          description: 'Picturesque canals, world-class museums, and cycling culture.',
          latitude: 52.3676,
          longitude: 4.9041,
          imageUrl: 'https://images.unsplash.com/photo-1555854877-b7a0b0c47fbc?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Singapore',
          country: 'Singapore',
          description: 'Modern city-state with futuristic architecture, gardens, and diverse food scene.',
          latitude: 1.3521,
          longitude: 103.8198,
          imageUrl: 'https://images.unsplash.com/photo-1549583021-45c3c5c5e8f5?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Istanbul',
          country: 'Turkey',
          description: 'Historic city bridging Europe and Asia with stunning mosques and bazaars.',
          latitude: 41.0082,
          longitude: 28.9784,
          imageUrl: 'https://images.unsplash.com/photo-1524231757912-726b2e5b78c7?w=800&h=600&fit=crop',
          popular: true
        },
        {
          name: 'Mumbai',
          country: 'India',
          description: 'Bustling Indian city with Bollywood, historic landmarks, and vibrant street life.',
          latitude: 19.0760,
          longitude: 72.8777,
          imageUrl: 'https://images.unsplash.com/photo-1549583021-45c3c5c5e8f5?w=800&h=600&fit=crop',
          popular: true
        }
      ]
    })

    console.log('🏙️ Created sample cities')

    // Create shared trips that all users can access
    const sharedTrips = await prisma.trip.createMany({
      data: [
        {
          title: 'Paris Adventure 2024',
          destination: 'Paris, France',
          description: 'Romantic getaway to the City of Light with visits to Eiffel Tower, Louvre, and charming cafés.',
          startDate: new Date('2024-06-15'),
          endDate: new Date('2024-06-22'),
          budget: 250000,
          spent: 183000,
          status: 'PLANNED',
          tripType: 'LEISURE',
          travelers: 2,
          coverImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=400&fit=crop',
          isPublic: true,
          userId: john.id
        },
        {
          title: 'Tokyo Explorer',
          destination: 'Tokyo, Japan',
          description: 'Amazing cultural experience exploring temples, modern districts, and incredible cuisine.',
          startDate: new Date('2024-03-10'),
          endDate: new Date('2024-03-18'),
          budget: 350000,
          spent: 340300,
          status: 'COMPLETED',
          tripType: 'ADVENTURE',
          travelers: 3,
          coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop',
          isPublic: true,
          userId: john.id
        },
        {
          title: 'Summer in Greece',
          destination: 'Santorini, Greece',
          description: 'Island hopping through beautiful Greek islands with stunning sunsets and beaches.',
          startDate: new Date('2024-07-20'),
          endDate: new Date('2024-07-30'),
          budget: 400000,
          spent: 66400,
          status: 'PLANNED',
          tripType: 'LEISURE',
          travelers: 4,
          coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=400&fit=crop',
          isPublic: true,
          userId: john.id
        },
        {
          title: 'London Business Trip',
          destination: 'London, UK',
          description: 'Business trip with some leisure time to explore historic landmarks.',
          startDate: new Date('2024-05-10'),
          endDate: new Date('2024-05-15'),
          budget: 200000,
          spent: 0,
          status: 'PLANNED',
          tripType: 'BUSINESS',
          travelers: 1,
          coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop',
          isPublic: true,
          userId: jane.id
        },
        {
          title: 'Dubai Luxury',
          destination: 'Dubai, UAE',
          description: 'Luxury shopping and modern architecture experience.',
          startDate: new Date('2024-09-25'),
          endDate: new Date('2024-09-28'),
          budget: 450000,
          spent: 0,
          status: 'PLANNED',
          tripType: 'LEISURE',
          travelers: 2,
          coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
          isPublic: true,
          userId: jane.id
        },
        {
          title: 'Rome Historical Tour',
          destination: 'Rome, Italy',
          description: 'Explore ancient ruins, Vatican City, and Italian cuisine.',
          startDate: new Date('2024-10-05'),
          endDate: new Date('2024-10-12'),
          budget: 280000,
          spent: 0,
          status: 'PLANNED',
          tripType: 'LEISURE',
          travelers: 3,
          coverImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=400&fit=crop',
          isPublic: true,
          userId: jane.id
        }
      ]
    })

    console.log('✈️ Created sample trips')

    // Get created trips
    const createdTrips = await prisma.trip.findMany()
    const parisTrip = createdTrips.find(t => t.destination === 'Paris, France')
    const tokyoTrip = createdTrips.find(t => t.destination === 'Tokyo, Japan')
    const greeceTrip = createdTrips.find(t => t.destination === 'Santorini, Greece')

    // Create budgets for Paris trip
    if (parisTrip) {
      await prisma.budget.createMany({
        data: [
          {
            category: 'ACCOMMODATION',
            allocated: 100000,
            spent: 85000,
            description: 'Hotel in central Paris',
            tripId: parisTrip.id
          },
          {
            category: 'TRANSPORTATION',
            allocated: 50000,
            spent: 48000,
            description: 'Flights and local transport',
            tripId: parisTrip.id
          },
          {
            category: 'FOOD',
            allocated: 60000,
            spent: 30000,
            description: 'Restaurants and cafés',
            tripId: parisTrip.id
          },
          {
            category: 'ACTIVITIES',
            allocated: 40000,
            spent: 20000,
            description: 'Museums, tours, and attractions',
            tripId: parisTrip.id
          }
        ]
      })

      // Create stops for Paris trip
      const stops = await prisma.stop.createMany({
        data: [
          {
            name: 'Day 1: Arrival & Eiffel Tower',
            description: 'Check-in at hotel and visit the iconic Eiffel Tower',
            date: new Date('2024-06-15'),
            order: 1,
            location: 'Champ de Mars, Paris',
            latitude: 48.8584,
            longitude: 2.2945,
            tripId: parisTrip.id
          },
          {
            name: 'Day 2: Louvre Museum',
            description: 'Explore the world\'s largest art museum',
            date: new Date('2024-06-16'),
            order: 2,
            location: 'Rue de Rivoli, Paris',
            latitude: 48.8606,
            longitude: 2.3376,
            tripId: parisTrip.id
          },
          {
            name: 'Day 3: Versailles',
            description: 'Day trip to the Palace of Versailles',
            date: new Date('2024-06-17'),
            order: 3,
            location: 'Versailles',
            latitude: 48.8049,
            longitude: 2.1204,
            tripId: parisTrip.id
          }
        ]
      })

      // Create activities for first stop
      const createdStops = await prisma.stop.findMany({ where: { tripId: parisTrip.id } })
      const firstStop = createdStops[0]

      if (firstStop) {
        await prisma.activity.createMany({
          data: [
            {
              name: 'Eiffel Tower Summit Access',
              description: 'Take elevator to the top of the Eiffel Tower',
              time: new Date('2024-06-15T14:00:00Z'),
              duration: 120,
              cost: 2500,
              category: 'SIGHTSEEING',
              location: 'Eiffel Tower',
              latitude: 48.8584,
              longitude: 2.2945,
              stopId: firstStop.id
            },
            {
              name: 'Seine River Cruise',
              description: 'Evening cruise along the Seine River',
              time: new Date('2024-06-15T18:00:00Z'),
              duration: 90,
              cost: 1500,
              category: 'ENTERTAINMENT',
              location: 'Port de la Bourdonnais',
              stopId: firstStop.id
            }
          ]
        })
      }

      // Create checklist items
      await prisma.checklistItem.createMany({
        data: [
          {
            title: 'Passport',
            description: 'Check passport validity',
            quantity: 1,
            category: 'Documents',
            isPacked: true,
            tripId: parisTrip.id
          },
          {
            title: 'Camera',
            description: 'DSLR camera with charger',
            quantity: 1,
            category: 'Electronics',
            isPacked: false,
            tripId: parisTrip.id
          },
          {
            title: 'Travel Insurance',
            description: 'Comprehensive travel insurance',
            quantity: 1,
            category: 'Documents',
            isPacked: true,
            tripId: parisTrip.id
          },
          {
            title: 'Comfortable walking shoes',
            description: 'For lots of walking around the city',
            quantity: 2,
            category: 'Clothing',
            isPacked: false,
            tripId: parisTrip.id
          }
        ]
      })

      // Create notes
      await prisma.note.createMany({
        data: [
          {
            title: 'Restaurant Recommendations',
            content: 'Le Comptoir du Relais - Great traditional French food. Book in advance!\n\nL\'As du Fallafel - Best falafel in the Marais district.',
            isPublic: false,
            tripId: parisTrip.id,
            authorId: john.id,
            userId: john.id
          },
          {
            title: 'Paris Tips',
            content: 'Buy museum passes online to skip lines. The Paris Metro is the best way to get around. Learn basic French phrases - locals appreciate it!',
            isPublic: true,
            tripId: parisTrip.id,
            authorId: john.id,
            userId: john.id
          }
        ]
      })
    }

    console.log('📊 Created budgets, stops, activities, checklist, and notes')

    // Get all users for sharing trips
    const allUsers = await prisma.user.findMany()
    const allTrips = await prisma.trip.findMany()

    // Create shared trip relationships so all users can see all trips
    for (const trip of allTrips) {
      for (const user of allUsers) {
        // Skip the trip owner to avoid duplicate entries
        if (user.id !== trip.userId) {
          await prisma.sharedTrip.create({
            data: {
              tripId: trip.id,
              userId: user.id,
              canEdit: false, // View-only for other users
              shareCode: `SHARE_${trip.id}_${user.id}`,
              expiresAt: new Date('2025-12-31') // Long expiration
            }
          })
        }
      }
    }

    console.log('🔗 Created shared trip relationships for all users')

    // Get specific trips for additional data
    const londonTrip = allTrips.find(t => t.destination === 'London, UK')
    const dubaiTrip = allTrips.find(t => t.destination === 'Dubai, UAE')

    // Add comprehensive data for London trip
    if (londonTrip) {
      // Budgets for London
      await prisma.budget.createMany({
        data: [
          {
            category: 'ACCOMMODATION',
            allocated: 80000,
            spent: 0,
            description: 'Business hotel in central London',
            tripId: londonTrip.id
          },
          {
            category: 'TRANSPORTATION',
            allocated: 40000,
            spent: 0,
            description: 'Flights and London Underground',
            tripId: londonTrip.id
          },
          {
            category: 'FOOD',
            allocated: 50000,
            spent: 0,
            description: 'Business meals and dining',
            tripId: londonTrip.id
          },
          {
            category: 'ENTERTAINMENT',
            allocated: 30000,
            spent: 0,
            description: 'Theater shows and sightseeing',
            tripId: londonTrip.id
          }
        ]
      })

      // Stops for London trip
      await prisma.stop.createMany({
        data: [
          {
            name: 'Day 1: Arrival & Tower of London',
            description: 'Check-in and explore historic Tower of London',
            date: new Date('2024-05-10'),
            order: 1,
            location: 'Tower of London',
            latitude: 51.5081,
            longitude: -0.0759,
            tripId: londonTrip.id
          },
          {
            name: 'Day 2: Business Meeting & British Museum',
            description: 'Morning meetings, afternoon at British Museum',
            date: new Date('2024-05-11'),
            order: 2,
            location: 'British Museum',
            latitude: 51.5194,
            longitude: -0.1270,
            tripId: londonTrip.id
          },
          {
            name: 'Day 3: West End Theater',
            description: 'Evening theater show in West End',
            date: new Date('2024-05-12'),
            order: 3,
            location: 'Covent Garden',
            latitude: 51.5120,
            longitude: -0.1243,
            tripId: londonTrip.id
          }
        ]
      })

      // Activities for London trip
      const londonStops = await prisma.stop.findMany({ where: { tripId: londonTrip.id } })
      if (londonStops.length > 0) {
        await prisma.activity.createMany({
          data: [
            {
              name: 'Tower of London Tour',
              description: 'Guided tour of the historic fortress',
              time: new Date('2024-05-10T10:00:00Z'),
              duration: 180,
              cost: 3000,
              category: 'SIGHTSEEING',
              location: 'Tower of London',
              stopId: londonStops[0].id
            },
            {
              name: 'Thames River Walk',
              description: 'Evening walk along the Thames River',
              time: new Date('2024-05-10T18:00:00Z'),
              duration: 60,
              cost: 0,
              category: 'RELAXATION',
              location: 'South Bank',
              stopId: londonStops[0].id
            },
            {
              name: 'British Museum Highlights',
              description: 'See Rosetta Stone and Egyptian artifacts',
              time: new Date('2024-05-11T14:00:00Z'),
              duration: 120,
              cost: 0,
              category: 'CULTURE',
              location: 'British Museum',
              stopId: londonStops[1].id
            },
            {
              name: 'Les Misérables Musical',
              description: 'West End theater performance',
              time: new Date('2024-05-12T19:30:00Z'),
              duration: 180,
              cost: 8000,
              category: 'ENTERTAINMENT',
              location: 'Queen\'s Theatre',
              stopId: londonStops[2].id
            }
          ]
        })
      }
    }

    // Add comprehensive data for Dubai trip
    if (dubaiTrip) {
      // Budgets for Dubai
      await prisma.budget.createMany({
        data: [
          {
            category: 'ACCOMMODATION',
            allocated: 150000,
            spent: 0,
            description: 'Luxury resort in Dubai Marina',
            tripId: dubaiTrip.id
          },
          {
            category: 'TRANSPORTATION',
            allocated: 50000,
            spent: 0,
            description: 'Flights and luxury car rental',
            tripId: dubaiTrip.id
          },
          {
            category: 'SHOPPING',
            allocated: 200000,
            spent: 0,
            description: 'Dubai Mall and luxury shopping',
            tripId: dubaiTrip.id
          },
          {
            category: 'ENTERTAINMENT',
            allocated: 50000,
            spent: 0,
            description: 'Desert safari and attractions',
            tripId: dubaiTrip.id
          }
        ]
      })

      // Stops for Dubai trip
      await prisma.stop.createMany({
        data: [
          {
            name: 'Day 1: Burj Khalifa & Dubai Mall',
            description: 'Visit world\'s tallest building and luxury shopping',
            date: new Date('2024-09-25'),
            order: 1,
            location: 'Downtown Dubai',
            latitude: 25.1972,
            longitude: 55.2744,
            tripId: dubaiTrip.id
          },
          {
            name: 'Day 2: Desert Safari',
            description: 'Evening desert safari with dune bashing',
            date: new Date('2024-09-26'),
            order: 2,
            location: 'Dubai Desert',
            latitude: 25.0000,
            longitude: 55.0000,
            tripId: dubaiTrip.id
          },
          {
            name: 'Day 3: Palm Jumeirah',
            description: 'Explore man-made island and Atlantis resort',
            date: new Date('2024-09-27'),
            order: 3,
            location: 'Palm Jumeirah',
            latitude: 25.1125,
            longitude: 55.1390,
            tripId: dubaiTrip.id
          }
        ]
      })

      // Activities for Dubai trip
      const dubaiStops = await prisma.stop.findMany({ where: { tripId: dubaiTrip.id } })
      if (dubaiStops.length > 0) {
        await prisma.activity.createMany({
          data: [
            {
              name: 'Burj Khalifa At the Top',
              description: 'Observation deck on 148th floor',
              time: new Date('2024-09-25T15:00:00Z'),
              duration: 120,
              cost: 15000,
              category: 'SIGHTSEEING',
              location: 'Burj Khalifa',
              stopId: dubaiStops[0].id
            },
            {
              name: 'Dubai Aquarium',
              description: 'Underwater zoo in Dubai Mall',
              time: new Date('2024-09-25T18:00:00Z'),
              duration: 90,
              cost: 3000,
              category: 'ENTERTAINMENT',
              location: 'Dubai Mall',
              stopId: dubaiStops[0].id
            },
            {
              name: 'Desert Dune Bashing',
              description: '4x4 adventure in desert dunes',
              time: new Date('2024-09-26T16:00:00Z'),
              duration: 240,
              cost: 8000,
              category: 'ADVENTURE',
              location: 'Dubai Desert',
              stopId: dubaiStops[1].id
            },
            {
              name: 'Atlantis Aquaventure',
              description: 'Water park at Atlantis resort',
              time: new Date('2024-09-27T10:00:00Z'),
              duration: 300,
              cost: 12000,
              category: 'ENTERTAINMENT',
              location: 'Atlantis The Palm',
              stopId: dubaiStops[2].id
            }
          ]
        })
      }
    }

    console.log('✈️ Created sample trips for Jane with comprehensive data')

    // All trips have been created as shared trips above

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📝 Sample Login Credentials:')
    console.log('   User: john@example.com | Password: password123')
    console.log('   User: jane@example.com | Password: password123')
    console.log('   Admin: admin@example.com | Password: password123')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedData()
