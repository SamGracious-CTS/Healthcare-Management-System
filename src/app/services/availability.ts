import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Availability {
  private savedSlots: any = {};


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

        const overlaps = this.savedSlots[date].some(
          (s: any) => slot.startTime < s.endTime && slot.endTime > s.startTime
        );

        if (overlaps) {
          alert(
            `Slot overlaps with existing slot on ${date} from ${slot.startTime} to ${slot.endTime}`
          );
          continue;
        }

        this.savedSlots[date].push(newSlot);
      }
    }
  }



  editSlot(
    oldDate: string,
    newDate: string,
    updatedSlot: { id: string; startTime: string; endTime: string }
  ): void {
    const oldSlots = this.savedSlots[oldDate];
    if (!oldSlots) return;

    const index = oldSlots.findIndex((s: any) => s.id === updatedSlot.id);
    if (index === -1) return;

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

    oldSlots.splice(index, 1);

    if (!this.savedSlots[newDate]) {
      this.savedSlots[newDate] = [];
    }
    const newSlots = this.savedSlots[newDate];

    const overlaps = newSlots.some(
      (s: any) => updatedSlot.startTime < s.endTime && updatedSlot.endTime > s.startTime
    );
    if (overlaps) {
      alert(`Cannot update slot: overlaps with another slot on ${newDate}`);
      oldSlots.push(updatedSlot);
      return;
    }

    newSlots.push(updatedSlot);
  }

  deleteSlot(date: string, slotId: string): void {
    this.savedSlots[date] = this.savedSlots[date]?.filter((s: any) => s.id !== slotId);
  }
}
