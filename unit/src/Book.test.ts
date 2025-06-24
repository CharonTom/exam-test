import { describe, it, expect, beforeEach } from "vitest";
import { Book } from "./Book";
import type { BookStatus } from "./types";

describe("Book", () => {
  let book: Book;

  beforeEach(() => {
    book = new Book("1", "LOTR", "JRR TOLKIEN");
  });

  it('devrait être initialisé avec le statut "available"', () => {
    expect(book.id).toBe("1");
    expect(book.title).toBe("LOTR");
    expect(book.author).toBe("JRR TOLKIEN");
    expect(book.isAvailable()).toBe(true);
    expect(book.isBorrowed()).toBe(false);
    expect(book.isInMaintenance()).toBe(false);
  });

  it('devrait indiquer "borrowed" lorsque le statut est emprunté', () => {
    (book.status as BookStatus) = "borrowed";

    expect(book.isBorrowed()).toBe(true);
    expect(book.isAvailable()).toBe(false);
    expect(book.isInMaintenance()).toBe(false);
  });

  it('devrait indiquer "maintenance" lorsque le statut est en maintenance', () => {
    (book.status as BookStatus) = "maintenance";

    expect(book.isInMaintenance()).toBe(true);
    expect(book.isAvailable()).toBe(false);
    expect(book.isBorrowed()).toBe(false);
  });
});
