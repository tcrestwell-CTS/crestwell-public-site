import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Crestwell Travel Services LLC.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(13,27,42,0.1)' }}>
        {title}
      </h2>
      <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.85 }}>
        {children}
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px 64px', textAlign: 'center' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: 48 }} />
        <div className="overline" style={{ marginBottom: 16 }}>Legal</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', lineHeight: 1.2 }}>
          Terms & Conditions
        </h1>
      </section>

      {/* Content */}
      <section style={{ background: 'white', padding: '64px 32px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <Section title="Reservations">
            <p>Please visit <a href="https://www.crestwellgetaways.com" style={{ color: 'var(--navy)' }}>www.crestwellgetaways.com</a>, call Crestwell Travel Services LLC at (470) 232-9288, or contact us via email at info@crestwellgetaways.com.</p>
          </Section>

          <Section title="Identification">
            <p>Guests must make reservations in the full name that is listed on their passport that they will use for travel. If you need to make any changes to a name after travel documents have been issued, clients will be responsible for all name change fees, if applicable.</p>
          </Section>

          <Section title="Payments">
            <p>Reservations can be made online with major credit cards.</p>
          </Section>

          <Section title="Refunds">
            <p>All payments to Crestwell Travel Services are non-refundable and non-transferable. This is because Crestwell Travel Services has contractual agreements with hotels, airlines, and other vendors that will not allow us to obtain refunds. This way, we can keep our package prices competitive and allow you to make monthly payments on your vacation.</p>
          </Section>

          <Section title="Chargebacks">
            <p>Before filing a dispute with your bank, call Crestwell Travel Services LLC at (470) 232-9288 or contact us via email at info@crestwellgetaways.com to discuss account resolution. Filing chargebacks could result in your reservation being canceled and may prevent future travel with Crestwell Travel Services LLC.</p>
          </Section>

          <Section title="Passports and Visas">
            <p>Passengers are responsible for ensuring they have the proper travel documents and MUST CHECK with the respective consulate(s) or visa agency to determine whether any visas or passports are required. Passports are required to be valid for at least 6 months after the date of travel. Some countries require a full blank "VISA" page in the passport for stamping purposes.</p>
            <p style={{ marginTop: 12 }}>Any information provided in the travel description pertains to US citizens only. Non-US citizens should check with the respective consulate of the country(s) to be visited for current entry requirements. Crestwell Travel Services LLC does not provide or validate travel requirements for Non-US citizens. We strongly suggest all cruise passengers have a valid passport in their possession while cruising.</p>
          </Section>

          <Section title="Travel Insurance">
            <p>Missing a vacation is bad enough. Losing the money you paid for your vacation is even worse. Therefore, we highly recommend Travel Insurance that provides coverage for Trip Cancellation, Interruption, Baggage Loss, and more. You are required to select and purchase travel insurance yourself for domestic and international tours.</p>
          </Section>

          <Section title="Travel Documents">
            <p>Provided full payment is received no later than your Final Payment due date, travel documents and travel instructions will be sent via email and/or mail 30 days or earlier before travel.</p>
          </Section>

          <Section title="Children">
            <p>All children under 18 must be accompanied by an adult. The minimum age for children on tours is 16. Accompanying adults are responsible for the safety of their children. Please note that many countries have adopted practices to prevent international abductions of children. If a person under the age of 18 years is traveling with an adult other than his/her parents or with only one parent, a notarized letter written by the parents, or non-traveling parent, granting authorization to travel, including the dates of travel, should be carried.</p>
          </Section>

          <Section title="Prices">
            <p>All prices listed are per person based upon shared twin room occupancy unless otherwise clearly specified. Prices do not include items of a personal nature, such as laundry, wines, water, beverages, food (other than at all-inclusive resorts or where clearly specified), passport and visa fees, insurance, and foreign port taxes unless specifically indicated in the package inclusions.</p>
            <p style={{ marginTop: 12 }}>Prices are correct at the time of publication; however, as airfares continually fluctuate and classes of service may have limited capacity, tour package prices and availability will change accordingly. In case of human or computer error, Crestwell Travel Services LLC reserves the right to re-invoice for the correct price or service. A full refund will be made to passengers who choose not to pay an increase, provided Crestwell Travel Services receives a written cancellation within five days of the price increase notification.</p>
          </Section>

          <Section title="Automatic Billing Plan">
            <p>You are automatically enrolled in our automatic billing plan upon booking. You can relax knowing that your future payments will be made automatically. When you book, we'll calculate an evenly divided automatic billing plan for you, and you will know in advance on the day of every month that your payment will be processed. Your initial deposit is due at the time of booking, and your future payments will be charged according to the schedule you see on your invoice. Automatic billing is available at no charge.</p>
            <p style={{ marginTop: 12 }}>You can opt out of automatic billing by emailing us after you make your reservations at info@crestwellgetaways.com.</p>
          </Section>

          <Section title="Payments & Cancellation">
            <p><strong>Deposit:</strong> A deposit is due at the time of the reservation. All deposits are non-refundable and non-transferable.</p>
            <p style={{ marginTop: 10 }}><strong>Full Payment:</strong> All reservations can be paid in full at the time of booking as long as the tour still has available space.</p>
            <p style={{ marginTop: 10 }}><strong>Late Payment:</strong> If there is any outstanding balance by the Final Payment Due date listed on your invoice, a late fee of $250 will automatically be added to your invoice one day after your final payment date.</p>
            <p style={{ marginTop: 10 }}><strong>Reinstatement of Reservations:</strong> If your travel reservations have been canceled, and you notify us within 14 days that you want to reinstate your reservations, a service reinstatement fee of $250 will be added to your invoice and must be paid in advance to apply for reconfirmation of services.</p>
            <p style={{ marginTop: 10 }}><strong>Last Minute Reservations:</strong> All reservations must be made no later than 60 days before departure. If requested services cannot be confirmed, payment will be refunded. If services are confirmed, final payment is due within 24 hours, and all applicable cancellation penalties will apply.</p>
            <p style={{ marginTop: 10 }}><strong>Form of Payment:</strong> Crestwell Travel Services LLC accepts all major credit or debit cards (American Express, Discover, Mastercard, Visa).</p>
            <p style={{ marginTop: 10 }}><strong>Refunds:</strong> All payments to Crestwell Travel Services LLC are non-refundable and non-transferable.</p>
            <p style={{ marginTop: 10 }}><strong>Cancellation:</strong> Once reservations have been made, cancellations will only be accepted in writing. Email your cancellation request to info@crestwellgetaways.com with your invoice number, full name, and travel date. Once your email has been received, you must complete the cancellation request form sent to you via email. If you do not receive an acknowledgment within 48 hours, please call (470) 232-9288.</p>
            <p style={{ marginTop: 10 }}><strong>Reservation Name Changes:</strong> Name changes due to incorrect information being provided will incur a $250 per person charge plus any additional supplier fees. Please note that name changes to airline reservations are subject to full cancellation and rebooking.</p>
          </Section>

          <Section title="COVID-19 Waiver of Liability">
            <p>In Spring 2020, the World Health Organization (WHO) declared the Novel Coronavirus (COVID-19) a worldwide pandemic. By traveling with Crestwell Travel Services LLC, I understand and agree to the following:</p>
            <ol style={{ paddingLeft: 20, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>COVID-19 is a highly contagious virus that can be spread via person-to-person contact.</li>
              <li>After a reasonable inquiry, Crestwell Travel Services LLC provided me with the best available information regarding the pandemic-protective policies and practices of the vendors and suppliers in my travel itinerary.</li>
              <li>Suppliers may have policies in place to help prevent the spread of COVID-19. Crestwell Travel Services LLC is not the drafter or holder of those policies, and I understand that these policies can change at any time.</li>
              <li>I understand that each state/country institutes its own pandemic-protective policies and regulations. I am responsible for knowing, understanding, and abiding by those policies.</li>
              <li>I understand that by traveling, I can be subject to voluntary or involuntary quarantine either at home or in the traveled location(s).</li>
              <li>With full awareness of the risks involved, I assume all risks of travel and hereby forever hold harmless, waive, discharge, and release Crestwell Travel Services LLC from any and all liability arising out of or related to any loss, damage, or injury related to COVID-19.</li>
            </ol>
          </Section>

          <Section title="Force Majeure">
            <p>There may be times when either party is unable to perform under the travel contract for reasons out of each other's control. These force majeure events include but are not limited to: acts of God, acts of government, acts of war or civil unrest, insurrection or revolts, military action, strikes or other labor activities, criminal or terrorist activities, pandemics, epidemics, earthquakes, hurricanes, and other events outside the reasonable control of either party.</p>
            <p style={{ marginTop: 12 }}>In the event that a force majeure event occurs, the parties will look to and follow the cancellation policies of the suppliers and these terms & conditions. Passengers will be informed of their options if a force majeure event occurs.</p>
          </Section>

          <Section title="Travelers with Disabilities">
            <p>In order to fully enjoy your tour, we recommend that you select a trip that is suitable to your physical capabilities. Tour participants requiring any form of assistance are required to notify Crestwell Travel Services LLC prior to reservation. The tour participant must be accompanied by an individual responsible for providing those services. Tour managers, guides, drivers, or other personnel are not able to provide such assistance.</p>
            <p style={{ marginTop: 12 }}><strong>Wheelchairs & Walkers (USA Tours):</strong> Crestwell Travel Services LLC seeks to accommodate disabled travelers to the extent possible. However, we cannot provide individual assistance to travelers with wheelchairs or other mobility devices. Passengers are required to advise us of their accessibility requirements prior to booking.</p>
            <p style={{ marginTop: 12 }}><strong>International Tours:</strong> Hotels and cruise lines outside of the United States are not required to comply with ADA requirements and may not have ramps, wide entryways, or elevators. Due to physical constraints and space limitations, wheelchairs and motorized scooters may not be taken aboard motor coaches and river cruises.</p>
            <p style={{ marginTop: 12 }}><strong>Service Animals:</strong> Service animals cannot be accommodated on international escorted tours. Passengers on USA escorted tours who require a service dog should check with Crestwell Travel Services LLC prior to booking.</p>
          </Section>

          <Section title="Airlines">
            <p>Crestwell Travel Services LLC is not responsible for the services and policies imposed by the airlines. Airline schedules and flights are subject to change without notice. Crestwell Travel Services LLC is not responsible for penalties incurred for tickets not issued by Crestwell Travel Services LLC due to schedule and/or flight changes.</p>
            <p style={{ marginTop: 12 }}><strong>Airline Tickets:</strong> Tickets will be issued electronically approximately 30 days prior to departure and are fully non-refundable.</p>
            <p style={{ marginTop: 12 }}><strong>Airline Seat Assignments:</strong> The airlines bear the sole authority of assigning seats on group flights. All Crestwell Travel Services LLC airline contracts are for economy-class seats only.</p>
            <p style={{ marginTop: 12 }}><strong>Airline Taxes & Fuel Surcharges:</strong> If you purchased airfare, airline taxes and fuel surcharges are included. Prior to full payment, there is a potential for price increases due to increases in government-levied taxes and fuel surcharges.</p>
          </Section>

          <Section title="Cruises">
            <p><strong>Ship & Itinerary Changes:</strong> Cruise itineraries and ships are subject to change without notice. Cruise ships may be chartered and/or departure dates canceled, in which case all monies will be refunded. Crestwell Travel Services LLC takes no responsibility for ship substitutions or itinerary changes imposed by a cruise line.</p>
            <p style={{ marginTop: 12 }}><strong>Medical Services:</strong> Many ships do not carry a doctor or nurse onboard. Should medical attention be required, local services will be contacted. The resulting charges will be the responsibility of the passenger.</p>
          </Section>

          <Section title="Release from Liability">
            <p>Crestwell Travel Services LLC does not own or operate any entity which is to or does provide goods or services for your trip. All such persons and entities are independent contractors. As a result, Crestwell Travel Services LLC is not liable for any negligent or willful act or failure to act of any such person or entity or of any other third party.</p>
            <p style={{ marginTop: 12 }}>Without limitation, Crestwell Travel Services LLC is not responsible for any injury, loss, or damage to person or property, death, delay or inconvenience in connection with the provision of any goods or services occasioned by or resulting from acts of God, acts of government, force majeure, acts of war or civil unrest, criminal or terrorist activities, mechanical failure of any means of transportation, dangers associated with animals or marine life, sanitation problems, food poisoning, lack of access to or quality of medical care, or any other cause beyond the direct control of Crestwell Travel Services LLC.</p>
          </Section>

          <Section title="Assumption of Risk">
            <p>I am aware that travel involves hazardous activities, with a risk of illness, injury, or death which may be caused by forces of nature, animals, insects, or flora, the negligence of Crestwell Travel Services LLC, or other persons and companies known or unknown, or of the willful or criminal conduct of third parties. I am willing to accept the risks and uncertainty involved as being an integral part of my adventure, and I hereby accept and assume full responsibility for any and all risks of illness, injury, or death.</p>
          </Section>

          <Section title="Binding Arbitration">
            <p>I agree that any dispute concerning, relating, or referring to this Agreement, or the trip itself, shall be resolved exclusively by binding arbitration pursuant to the Federal Arbitration Act, 9 U.S.C. §§1-16, either according to the then existing Commercial Rules of the American Arbitration Association (AAA) or pursuant to the Comprehensive Arbitration Rules & Procedures of the Judicial Arbitration and Mediation Services, Inc. (JAMS). Such proceedings will be governed by substantive Georgia law and will take place in Atlanta, GA.</p>
          </Section>

          <Section title="Photographic Release">
            <p>Crestwell Travel Services LLC may take photographs or video of its trips, and trip participants grant Crestwell Travel Services LLC permission to do so and for it to use same for promotional or commercial use without payment of any compensation to the participant.</p>
          </Section>

          <Section title="Use of Website">
            <p>www.crestwellgetaways.com is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein. Your use of the site constitutes your agreement to all such terms, conditions, and notices.</p>
            <p style={{ marginTop: 12 }}>The information, products, and services published on this website may include inaccuracies or typographical errors. In no event shall Crestwell Travel Services LLC be liable for any direct, indirect, punitive, incidental, special, or consequential damages arising out of, or in any way connected with, the use of this website.</p>
          </Section>

          <div style={{ marginTop: 48, padding: '24px 32px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--navy)', marginBottom: 8 }}>Questions about our Terms & Conditions?</p>
            <Link href="/contact" style={{ color: 'var(--navy)', fontWeight: 600, fontSize: '0.85rem' }}>Contact Us →</Link>
          </div>

        </div>
      </section>
    </>
  );
}
