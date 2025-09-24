import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Availability {
  private savedSlots: any = {};

  // // Save the availability data
  // saveAvailability(payload: any): void {
  //   this.savedSlots = { ...payload };
  //   console.log('Saved slots:', this.savedSlots);
  // }

  // Get the saved slots
  getSavedSlots(): any {
    console.log("savedSlots--",this.savedSlots)
    return this.savedSlots;
  }

  addSlot(payload: { [date: string]: { startTime: string; endTime: string }[] }): void {
    for (const date in payload) {
      console.log(date)
      const slots = payload[date];

      if (!this.savedSlots[date]) {
        this.savedSlots[date] = [];
      }

      for (const slot of slots) {
        const id = `${date}-${slot.startTime}-${slot.endTime}`;
        const newSlot = { ...slot, id };

        // Check for overlap
        const overlaps = this.savedSlots[date].some(
          (s: any) => slot.startTime < s.endTime && slot.endTime > s.startTime
        );

        if (overlaps) {
          alert(
            `Slot overlaps with existing slot on ${date} from ${slot.startTime} to ${slot.endTime}`
          );
          continue; // Skip adding this slot
        }

        this.savedSlots[date].push(newSlot);
      }
    }
  }

  // editSlot(date: string, updatedSlot: { id: string; startTime: string; endTime: string }): void {
  //   const slots = this.savedSlots[date];
  //   if (!slots) return;

  //   const index = slots.findIndex((s: any) => s.id === updatedSlot.id);
  //   if (index === -1) return;

  //   const overlaps = slots.some(
  //     (s: any) =>
  //       s.id !== updatedSlot.id &&
  //       updatedSlot.startTime < s.endTime &&
  //       updatedSlot.endTime > s.startTime
  //   );

  //   if (overlaps) {
  //     alert(`Cannot update slot: overlaps with another slot on ${date}`);
  //     return;
  //   }

  //   slots[index] = updatedSlot;
  // }

  editSlot(
    oldDate: string,
    newDate: string,
    updatedSlot: { id: string; startTime: string; endTime: string }
  ): void {
    // Remove from old date array
    const oldSlots = this.savedSlots[oldDate];
    if (!oldSlots) return;

    const index = oldSlots.findIndex((s: any) => s.id === updatedSlot.id);
    if (index === -1) return;

    // If date hasn't changed, just update in place
    if (oldDate === newDate) {
      const overlaps = oldSlots.some(
        (s: any) =>
          s.id !== updatedSlot.id &&
          updatedSlot.startTime < s.endTime &&
          updatedSlot.endTime > s.startTime
      );
      if (overlaps) {
        alert(`Cannot update slot: overlaps with another slot on ${newDate}`);
        return;
      }
      oldSlots[index] = updatedSlot;
      return;
    }

    // If date changed, remove from old date and add to new date
    oldSlots.splice(index, 1);

    // Ensure new date array exists
    if (!this.savedSlots[newDate]) {
      this.savedSlots[newDate] = [];
    }
    const newSlots = this.savedSlots[newDate];

    // Check for overlaps in new date
    const overlaps = newSlots.some(
      (s: any) => updatedSlot.startTime < s.endTime && updatedSlot.endTime > s.startTime
    );
    if (overlaps) {
      alert(`Cannot update slot: overlaps with another slot on ${newDate}`);
      // Optionally, add back to old date if needed
      oldSlots.push(updatedSlot);
      return;
    }

    newSlots.push(updatedSlot);
  }

  deleteSlot(date: string, slotId: string): void {
    this.savedSlots[date] = this.savedSlots[date]?.filter((s: any) => s.id !== slotId);
  }
}
